# 📘 **Exercício – App “Lembretes Diários” (React Native + Expo Notifications)**

## Objetivo

Criar um aplicativo simples que permita ao usuário agendar lembretes usando **notificações locais** no React Native com Expo.
O aluno irá praticar:

* Manipulação de estado (`useState`)
* Entrada de texto (`TextInput`)
* Listas com `FlatList`
* Funções assíncronas (`async/await`)
* Uso do módulo `expo-notifications`
* Validações básicas
* Cancelamento de notificações

---

# **Funcionalidades que o app deve ter**

## 1. Digitar um lembrete

* Um `TextInput` onde o usuário escreve algo como:

  * “Beber água”
  * “Estudar React Native”
  * “Alongar”

## 2. Escolher em quantos segundos o lembrete deve tocar

* Um outro `TextInput`, porém **numérico**, para informar o tempo.

Exemplo:

* Escrever **10** → tocar daqui a 10 segundos.

---

## 3. Agendar uma notificação local

Ao clicar no botão **"Agendar Lembrete"**, o app deve:

### ✔ Validar:

* Se o lembrete foi digitado
* Se o tempo foi preenchido
* Se o tempo é um número válido

### ✔ Agendar a notificação

Usar:

* `Notifications.scheduleNotificationAsync()`
* Trigger do tipo **TIME_INTERVAL**
* Título: **"Lembrete!"**
* Corpo: texto que o usuário digitou

---

## 4. Listar os lembretes agendados

Criar uma lista na tela:

* Pode usar `FlatList`
* Exibir cada lembrete com:

  * mensagem digitada
  * quantos segundos ele irá demorar para tocar

Essa lista é apenas **local**, não precisa salvar em banco.

---

## 5. Botão “Cancelar Todos”

Um botão que:

* Chama `Notifications.cancelAllScheduledNotificationsAsync()`
Exemplo:
```ts
// Cancelar todos os lembretes
  async function cancelarTodos() {
    await Notifications.cancelAllScheduledNotificationsAsync();
    setLembretes([]);
    Alert.alert("Cancelado", "Todos os lembretes foram removidos.");
  }
```
* Limpa a lista da tela
* Exibe um alerta informando que tudo foi cancelado

---

# **Dicas importantes para os alunos**

## Funções que você provavelmente vai precisar criar:

### **1. `pedirPermissao()`**

* Usa:

  * `getPermissionsAsync()`
  * `requestPermissionsAsync()`
* No Android, não esquecer de criar um **canal de notificação** com:

  * `setNotificationChannelAsync()`

---

### **2. `agendarLembrete()`**

* Lê o texto e os segundos do estado
* Verifica se os dados são válidos
* Converte para número (`Number(segundos)`)
* Agenda a notificação com:

  * `scheduleNotificationAsync()`
* Armazena um objeto com:

  ```js
  { id, mensagem, segundos }
  ```

  em um array no estado

---

### **3. `cancelarTodos()`**

* Cancela todas as notificações pendentes
* Limpa a lista do estado

---

## Componentes recomendados:

* `View` → estruturar a tela
* `Text` → títulos e textos
* `TextInput` → entradas de dados
* `Button` → acionar ações
* `FlatList` → listar os lembretes agendados
* `Alert` → avisar sobre erros / sucesso

---

## Estados recomendados (`useState`)

Crie estados como:

* `mensagem`
* `segundos`
* `lembretes` (array)

---

# **Critérios de entrega**

O aluno deverá entregar:

* `App.js` funcionando
* Interface simples, mas organizada
* Comentários explicando cada função
* Teste no próprio celular (recomendado)
* Vídeo mostrando a notificação funcionando (opcional, mas ideal)


