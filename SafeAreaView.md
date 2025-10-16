# 📱 Usando SafeAreaProvider e SafeAreaView no React Native

Os componentes `SafeAreaProvider` e `SafeAreaView` garantem que o conteúdo do app **não fique escondido** atrás de áreas como o **notch**, **barra de status** e **borda inferior** dos dispositivos modernos.

Eles fazem parte da biblioteca [`react-native-safe-area-context`](https://github.com/th3rdwave/react-native-safe-area-context).

---

## ⚙️ 1. Instalação

Antes de usar, **você precisa instalar a biblioteca**.

### 👉 Se você usa **Expo**:
O Expo **já inclui** essa biblioteca, então não precisa instalar nada.

Mas, se quiser garantir que está na versão mais recente:
```bash
npx expo install react-native-safe-area-context
````

### 👉 Se você usa **React Native CLI**:

Execute no terminal:

```bash
npm install react-native-safe-area-context
```

ou

```bash
yarn add react-native-safe-area-context
```

Após a instalação, se não estiver usando o Expo, é preciso **recompilar o app**:

```bash
npx react-native run-android
```

ou

```bash
npx react-native run-ios
```

---

## 🧱 2. O que é o SafeAreaProvider?

O `SafeAreaProvider` é o **componente principal** que fornece as informações sobre as áreas seguras da tela.

Ele deve ficar **no topo da aplicação**, envolvendo todos os outros componentes.
Sem ele, o `SafeAreaView` **não funciona** corretamente.

### ✅ Exemplo:

```jsx
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from './HomeScreen';

export default function App() {
  return (
    <SafeAreaProvider>
      <HomeScreen />
    </SafeAreaProvider>
  );
}
```

---

## 🧩 3. O que é o SafeAreaView?

O `SafeAreaView` é semelhante a uma `View`, mas adiciona **margens automáticas (padding)** para que o conteúdo **respeite as áreas seguras** do dispositivo.

### ✅ Exemplo:

```jsx
import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Conteúdo dentro da área segura!</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F7FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
```

> ⚠️ **Importante:** Se usar `SafeAreaView` sem `SafeAreaProvider`, aparecerá o erro:
>
> ```
> Error: No safe area value available. Make sure you are rendering <SafeAreaProvider> at the top of your app.
> ```

---

## 🧩 4. Estrutura correta do app

```jsx
import React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text>App dentro da área segura ✅</Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
```
---

## 🧰 6. Quando usar cada um?

| Situação                                 | Componente Ideal      |
| ---------------------------------------- | --------------------- |
| Estrutura geral da aplicação             | `SafeAreaProvider`    |
| Envolver conteúdo da tela                | `SafeAreaView`        |
| Ajustar margens dinamicamente via código | `useSafeAreaInsets()` |

---

## 🚀 7. Conclusão

* Sempre envolva sua aplicação com **`SafeAreaProvider`**.
* Use **`SafeAreaView`** para proteger o conteúdo das áreas não utilizáveis.
* Utilize **`useSafeAreaInsets()`** se quiser controlar manualmente os espaçamentos.

Esses componentes garantem que seu app fique **bonito e seguro** em qualquer dispositivo — seja um **iPhone com notch** ou um **Android com bordas arredondadas**.

---

**Exemplo visual:**

```
+-------------------------------------------+
|       🔵 Área segura (SafeAreaView)       |
|-------------------------------------------|
| Conteúdo visível e protegido              |
| (sem sobreposição com notch ou barras)    |
+-------------------------------------------+
```


