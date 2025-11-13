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

  /* 
  JSX — parte visual do aplicativo.
  Mostra um título e um botão para disparar a notificação.
  */
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
