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
      console.log("📬 Notificação recebida:", notification);
    }
  );

  return () => subscription.remove();
}, []);
```

---

## Conclusão

Com `expo-notifications`, você consegue:

* Enviar notificações locais
* Agendar lembretes
* Criar listeners
* Personalizar som e prioridade
* Criar triggers variados
* Trabalhar com push notifications futuramente
