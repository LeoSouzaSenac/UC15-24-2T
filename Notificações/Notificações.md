# Tutorial Completo de Notificações no React Native com Expo

Este documento explica **como trabalhar com notificações no React Native** usando a biblioteca **expo-notifications**. Você aprenderá:

* Como instalar e configurar a biblioteca
* Como pedir permissão ao usuário
* Como criar canais de notificação no Android
* Como enviar notificações locais
* Como reagir quando uma notificação chega
* Quais opções existem
* Como usar gatilhos (triggers)
* Boas práticas

---

## 1. O que é a biblioteca `expo-notifications`?

`expo-notifications` é a biblioteca oficial do Expo para gerenciar **notificações locais e push**. Com ela você pode:

### ✅ Enviar **notificações locais**

Notificações que o próprio app agenda e exibe.

### ✅ Receber **notificações push**

Enviadas pelo servidor via Push Notifications.

### ✅ Agendar notificações no tempo

Ex: "daqui a 10 segundos" ou "todo dia às 08:00".

### ✅ Criar listeners

Para saber quando a notificação chegou ou foi clicada.

### ✅ Criar canais de notificação no Android

Obrigatório para que notificações funcionem.

---

## 2. Instalação

No seu projeto Expo, execute:

```sh
eexpo install expo-notifications
```

E **para Android**, instale a permissão de vibrar:

```sh
eexpo install expo-device
```

> `expo-device` é necessário para obter informações do dispositivo (no caso de Push Notifications).

---

## 3. Configuração inicial

### Adicione no topo do seu código:

```js
import * as Notifications from "expo-notifications";
```

### Configure como o app reage quando recebe uma notificação:

```js
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});
```

Essas opções controlam:

* **shouldShowAlert** → se mostra banner
* **shouldPlaySound** → se toca som
* **shouldSetBadge** → número no ícone

## Nota: 
A API setNotificationHandler foi projetada para suportar código assíncrono, pois alguns usos podem exigir:

Buscar dados no armazenamento antes de decidir o alerta

Checar permissões no momento

Verificar configurações do usuário salvas no async storage

Consultar um backend

Carregar preferências antes de decidir se deve tocar som, por exemplo

---

## 4. Solicitando permissão ao usuário

Todo app precisa pedir permissão antes de enviar notificações.

```js
async function pedirPermissao() {
  const { status } = await Notifications.getPermissionsAsync();

  if (status !== "granted") {
    const { status: novoStatus } = await Notifications.requestPermissionsAsync();

    if (novoStatus !== "granted") {
      Alert.alert("Permissão negada", "O app não poderá enviar notificações.");
      return;
    }
  }

  // Criar canal no Android
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      sound: "default",
    });
  }
}
```

### Sobre canais de notificação (Android)

Eles definem:

* Som
* Prioridade
* Vibração
* Categoria

Sem o canal, **nenhuma notificação funciona** no Android.

---

## 5. Enviando uma notificação local

### Notificação após alguns segundos

```js
await Notifications.scheduleNotificationAsync({
  content: {
    title: "Notificação Local",
    body: "Enviada pelo app!",
    sound: true,
  },
  trigger: {
    seconds: 3,
  },
});
```

### Trigger com repetição

```js
trigger: {
  seconds: 60,
  repeats: true,
}
```

### Trigger com data

```js
trigger: {
  date: new Date(Date.now() + 10000) // daqui 10 segundos
}
```

### Trigger diário

```js
trigger: {
  hour: 8,
  minute: 0,
  repeats: true,
}
```

---

## 6. Listenings: ouvindo notificações

### Quando a notificação é **recebida**:

```js
Notifications.addNotificationReceivedListener((notification) => {
  console.log("Chegou a notificação:", notification);
});
```

### Quando a notificação é **tocada** pelo usuário:

```js
Notifications.addNotificationResponseReceivedListener((response) => {
  console.log("Usuário clicou!", response);
});
```

---

## 7. Opções avançadas

### Som personalizado (Android)

Coloque o arquivo `.wav` ou `.mp3` em:

```
android/app/src/main/res/raw/
```

E use:

```js
sound: "meusom.wav"
```

### Ações na notificação

Você pode criar botões:

```js
actions: [
  { identifier: "abrir", title: "Abrir" },
  { identifier: "cancelar", title: "Cancelar" },
]
```

### Badge (iOS)

```js
badge: 1
```

---

## 8. Boas práticas

✔ Peça permissão SOMENTE quando necessário

✔ Sempre crie canais no Android

✔ Teste notificações reais no **dispositivo físico** (emulador limita muito)

✔ Ao usar triggers repetidos, evite intervalos menores que 60 segundos (iOS bloqueia)

✔ Não abuse das notificações – afasta usuários

---

## 9. Exemplo completo

```js
useEffect(() => {
  pedirPermissao();

  const subscription = Notifications.addNotificationReceivedListener(
    (notification) => {
      console.log("Notificação recebida:", notification);
    }
  );

  return () => subscription.remove();
}, []);
```

---

## 10. Exemplo MAIS completo

```
import React, { useEffect } from "react";
import { Button, View, Text, Platform, Alert, StyleSheet } from "react-native";
// Importa o módulo de notificações do Expo
import * as Notifications from "expo-notifications";

/* 
-------------------------------------------------------
 CONFIGURAÇÃO GLOBAL DAS NOTIFICAÇÕES
-------------------------------------------------------
Aqui definimos como o app deve reagir quando uma notificação 
for recebida enquanto o aplicativo está ABERTO.
*/
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    // Exibe um alerta visual na tela (banner)
    shouldShowAlert: true,
    // Reproduz som de notificação (se houver)
    shouldPlaySound: true,
    // Não altera o "badge" do app (aquele número no ícone)
    shouldSetBadge: false,
    // Mostra a notificação na parte superior (Android/iOS)
    shouldShowBanner: true,
    // Exibe na Central de Notificações (iOS 15+)
    shouldShowList: true,
  }),
});

/* 
-------------------------------------------------------
 COMPONENTE PRINCIPAL DO APP
-------------------------------------------------------
É o componente funcional padrão do React Native.
*/
export default function App() {

  /* 
  useEffect: executa ações assim que o componente é montado.
  Aqui, usamos ele para:
   - Pedir permissão de notificação
   - Criar um "listener" que reage quando uma notificação é recebida
  */
  useEffect(() => {
    // Chama a função que solicita permissão do usuário
    pedirPermissao();

    // Cria um listener que "ouve" quando uma notificação é recebida
    const subscription: Notifications.EventSubscription =
      Notifications.addNotificationReceivedListener((notification) => {
        // Apenas exibe no console a notificação recebida
        console.log("Notificação recebida:", notification);
      });

    // Remove o listener quando o componente for desmontado
    return () => subscription.remove();
  }, []);

  /* 
  Função para ENVIAR uma notificação local.
  É chamada quando o usuário aperta o botão na tela.
  */
  const enviarNotificacao = async () => {
    await Notifications.scheduleNotificationAsync({
      // Conteúdo da notificação (título, corpo, som, etc.)
      content: {
        title: "Notificação Local", // Título da notificação
        body: "Enviada diretamente do app!", // Texto que aparece
        sound: true, // Toca som (no iOS)
      },
      // Define o "gatilho" (quando ela será exibida)
      trigger: {
        // Tipo do agendamento: intervalo de tempo
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        // Quantos segundos esperar até exibir (aqui: 3 segundos)
        seconds: 3,
      },
    });
  };

 
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Exemplo de Notificação Local</Text>
      <Button title="Enviar Notificação" onPress={enviarNotificacao} />
    </View>
  );
}

/* 
-------------------------------------------------------
 FUNÇÃO DE PERMISSÃO PARA NOTIFICAÇÕES
-------------------------------------------------------
Toda notificação precisa da autorização do usuário.
Essa função pede e verifica essa permissão.
*/
async function pedirPermissao(): Promise<void> {
  // Verifica o status atual da permissão
  const { status } = await Notifications.getPermissionsAsync();

  // Se ainda não está concedida...
  if (status !== "granted") {
    // Pede permissão ao usuário
    const { status: novoStatus } = await Notifications.requestPermissionsAsync();

    // Se o usuário negar, mostra um alerta
    if (novoStatus !== "granted") {
      Alert.alert("Permissão negada", "O app não poderá enviar notificações.");
      return;
    }
  }

  /* 
  No Android, é OBRIGATÓRIO criar um "canal de notificação".
  Esse canal define regras como prioridade, som e categoria.
  */
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default", // Nome interno do canal
      importance: Notifications.AndroidImportance.MAX, // Prioridade máxima
      sound: "default", // Usa o som padrão do sistema (deve ser string)
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    backgroundColor: "#f8f9fa",
    padding: 20, 
  },
  title: {
    fontSize: 20,
    marginBottom: 20, 
    textAlign: "center", 
  },
});

```

## Conclusão

Com `expo-notifications`, você consegue:

* Enviar notificações locais
* Agendar lembretes
* Criar listeners
* Personalizar som e prioridade
* Criar triggers variados
* Trabalhar com push notifications futuramente
