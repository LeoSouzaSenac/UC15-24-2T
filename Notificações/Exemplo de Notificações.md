# Exemplo de Notificações React Native (Expo)

Este documento serve como referência para organizar os arquivos do seu projeto de lembretes com notificações no Expo/React Native.

---

## 1. LembreteItem.tsx

> Aqui você deve colocar o código do seu componente LembreteItem.

```tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Lembrete } from "../screens/Home";

// Componente que representa um item de lembrete
// Props:
// - lembrete: objeto do tipo Lembrete, contendo mensagem e segundos
// - clicado: opcional, indica se o item foi clicado (para mudar estilo)
export default function LembreteItem({
  lembrete,
  clicado = false, // valor padrão: false
}: {
  lembrete: Lembrete,
  clicado?: boolean
}) {
  return (
    <View
      style={[
        styles.container,                // estilo base do container
        clicado ? styles.containerClicado : null, // aplica estilo alternativo se clicado
      ]}
    >
      {/* Texto principal da mensagem do lembrete */}
      <Text style={styles.mensagem}>{lembrete.mensagem}</Text>

      {/* Texto informando o tempo em segundos */}
      <Text style={styles.info}>{lembrete.segundos} segundos</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: "#fafafa",
  },
  containerClicado: {
    backgroundColor: "#d1f7d6", // verde claro para indicar que foi clicado
  },
  mensagem: { fontSize: 16, fontWeight: "500" },
  info: { fontSize: 12, color: "#666", marginTop: 4 },
});

```

---

## 2. Home.tsx

> Aqui você deve colocar o código do componente principal da tela Home.

```tsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  Alert,
  StyleSheet,
} from "react-native";

import {
  pedirPermissao,
  agendarNotificacao,
  cancelarTodasNotificacoes,
} from "../services/notification";
import * as Notifications from "expo-notifications";

import LembreteItem from "../components/LembreteItem";
// Define a estrutura de um lembrete
export interface Lembrete {
  id: string;          // ID único da notificação
  mensagem: string;    // Texto do lembrete
  segundos: number;    // Tempo em segundos para disparar a notificação
}

// Componente principal da tela Home
export default function Home() {
  // Estado que controla a mensagem digitada no input
  const [mensagem, setMensagem] = useState("");

  // Estado que controla os segundos digitados no input
  const [segundos, setSegundos] = useState("");

  // Lista de lembretes agendados
  const [lembretes, setLembretes] = useState<Lembrete[]>([]);

  // Armazena o ID do lembrete que foi clicado na notificação
  const [clicadoId, setClicadoId] = useState<string | null>(null);

  // useEffect para adicionar um listener de notificações
  useEffect(() => {
    // Detecta quando a notificação é recebida ou clicada
    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        const notificationId = response.notification.request.identifier;
        // Atualiza o estado para marcar o lembrete como clicado
        setClicadoId(notificationId);
        Alert.alert("Você clicou no lembrete!", "Confira na lista.");
      }
    );

    // Remove o listener ao desmontar o componente (por exemplo, se fôssemos para outra tela)
    return () => subscription.remove();
  }, []);

  // Função que agenda um novo lembrete
  async function agendarLembrete() {
    // Validação: mensagem não pode estar vazia
    if (!mensagem.trim()) {
      Alert.alert("Erro", "Digite uma mensagem.");
      return;
    }

    // Validação: segundos não pode estar vazio
    if (!segundos.trim()) {
      Alert.alert("Erro", "Digite um tempo válido em segundos.");
      return;
    }

    // Converte o input de segundos para número
    const tempo = Number(segundos);

    // Garante permissão para enviar notificações
    const permitido = await pedirPermissao();
    if (!permitido) return;

    // Agenda a notificação usando a função criada anteriormente
    const id = await agendarNotificacao(mensagem, tempo);

    // Cria um novo objeto lembrete
    const novo:Lembrete = { id, mensagem, segundos: tempo };

    // Atualiza a lista de lembretes, garantindo pegar o estado mais recente, ou seja
    // pega o valor que tinha antes no array + o item novo
    setLembretes((prev) => [...prev, novo]);

    // Mostra alerta confirmando que o lembrete foi agendado
    Alert.alert("Agendado", `Lembrete tocará em ${tempo} segundos.`);

    // Limpa os inputs, fazendo com que eles fiquem sem texto (apenas com o texto do placeholder)
    setMensagem("");
    setSegundos("");
  }

  // Função que cancela todos os lembretes
  async function cancelarTodos() {
    // Cancela todas as notificações agendadas
    await cancelarTodasNotificacoes();

    // Limpa a lista de lembretes e o lembrete clicado
    setLembretes([]);
    setClicadoId(null);
  }

  // Renderiza a interface
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Lembretes Diários</Text>

      {/* Input para digitar a mensagem */}
      <TextInput
        style={styles.input}
        placeholder="Digite o lembrete"
        value={mensagem}
        onChangeText={setMensagem}
      />

      {/* Input para digitar o tempo em segundos */}
      <TextInput
        style={styles.input}
        placeholder="Segundos"
        value={segundos}
        onChangeText={setSegundos}
        keyboardType="numeric" // Teclado numérico
      />

      {/* Botão para agendar o lembrete */}
      <Button title="Agendar Lembrete" onPress={agendarLembrete} />

      {/* Botão para cancelar todos os lembretes */}
      <View style={{ marginTop: 20 }}>
        <Button title="Cancelar Todos" color="red" onPress={cancelarTodos} />
      </View>

      {/* Lista de lembretes */}
      <FlatList
        style={{ marginTop: 30 }}
        data={lembretes}                       // Fonte de dados (nosso array lembretes)
        keyExtractor={(item) => item.id}       // ID único de cada item
        renderItem={({ item }) => (
          <LembreteItem
            lembrete={item}                     // Passa o objeto lembrete
            clicado={item.id === clicadoId}     // Marca como clicado se for o mesmo ID
          />
        )}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    backgroundColor: "#f4f4f4",
  },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },
});

```

---

## 3. notification.ts

> Este arquivo deve conter todas as funções relacionadas a notificações, como: `setNotificationHandler`, permissões, criação de canal Android, agendar e cancelar notificações.

```ts
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform } from "react-native";

// configuração global
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true, // mostra o alerta
    shouldPlaySound: true, // toca o som
    shouldSetBadge: false, // não mostra o id
    shouldShowBanner: true, // mostra a notificação visualmente (iOS)
    shouldShowList: true, // mostra na lista de notificações (iOS)
  }),
});

// pedir permissão
export async function pedirPermissao(): Promise<boolean> {
  // Verifica se está em um dispositivo real
  if (!Device.isDevice) {
    alert("Notificações funcionam apenas em dispositivo físico.");
    return false;
  }

  // Verificar e solicitar permissão
  // Pega o status atual das permissões de notificações do usuário
  const { status: existingStatus } = await Notifications.getPermissionsAsync();

  // Inicializa a variável finalStatus com o status atual
  let finalStatus = existingStatus;

  // Verifica se o usuário ainda não deu permissão
  if (existingStatus !== "granted") {
    // Solicita permissão ao usuário para enviar notificações
    const { status } = await Notifications.requestPermissionsAsync();

    // Atualiza finalStatus com a resposta do usuário
    finalStatus = status;
  }

  // Se, após solicitar, a permissão **ainda não foi concedida**
  if (finalStatus !== "granted") {
    // Mostra um alerta informando que a permissão foi negada
    alert("Permissão para notificações negada.");

    // Retorna false para indicar que não é possível enviar notificações
    return false;
  }

  // Verifica se o app está rodando no Android
  if (Platform.OS === "android") {
    // Cria ou atualiza um canal de notificações chamado "default"
    // No Android, os canais definem como as notificações serão exibidas (é obrigatório ou não mostra notificação no Android)
    await Notifications.setNotificationChannelAsync("default", {
      name: "Padrão", // Nome do canal que aparece nas configurações do Android
      importance: Notifications.AndroidImportance.MAX, // Prioridade máxima, mostra pop-up e som
      sound: "default", // Som padrão do dispositivo
      vibrationPattern: [0, 250, 250, 250], // Padrão de vibração: pausa 0ms, vibra 250ms, pausa 250ms, vibra 250ms
      enableVibrate: true, // Habilita a vibração
    });
  }

  // Se chegou até aqui, a permissão foi concedida e o canal criado
  // Retorna true para indicar que podemos enviar notificações
  return true;
}

// Função que agenda uma notificação
// mensagem: texto que aparecerá na notificação
// segundos: tempo em segundos até a notificação disparar
export async function agendarNotificacao(mensagem: string, segundos: number) {
  // scheduleNotificationAsync retorna um ID único da notificação agendada
  const id = await Notifications.scheduleNotificationAsync({
    content: {
      title: "Lembrete!",    // Título da notificação
      body: mensagem,        // Texto da notificação (passado como parâmetro)
      sound: "default",      // Toca som padrão do dispositivo
    },
    trigger: {
      // Define como a notificação será disparada
      // Aqui, usamos intervalo de tempo
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: segundos,    // Quantos segundos esperar antes de disparar
      repeats: true,        // True = repete a notificação no mesmo intervalo
    },
  });

  // Retorna o ID da notificação agendada
  // Esse ID é útil caso queira **cancelar** a notificação depois
  return id;
}

// Função que cancela todas as notificações agendadas
export async function cancelarTodasNotificacoes() {
  // Cancela todas as notificações que foram agendadas mas ainda não dispararam
  await Notifications.cancelAllScheduledNotificationsAsync();

  // Mostra um alerta informando que todas foram canceladas
  alert("Todos os lembretes foram cancelados.");
}
```

---

## 4. App.tsx

> Aqui você deve integrar seu `Home`.

```tsx
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Home from "./screens/Home";

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <Home />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

```

---

### Observações:

* Lembre-se de importar corretamente os arquivos e funções.
* No `notification.ts`, garanta que `pedirPermissao`, `agendarNotificacao` e `cancelarTodasNotificacoes` estão exportados.
* No `App.tsx`, você pode chamar funções de inicialização de notificações (como `setNotificationHandler`) antes de renderizar a tela Home.
* Cada seção de código está separada para facilitar a organização e manutenção.
