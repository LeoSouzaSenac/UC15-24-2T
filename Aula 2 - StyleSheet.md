# 🎨 Guia completo sobre **StyleSheet** no React Native

O **StyleSheet** é o sistema de estilos do React Native — ele funciona de forma parecida com o CSS da web, mas com **algumas diferenças importantes**.

---

## 🧩 O que é o StyleSheet?

O `StyleSheet` serve para **organizar e aplicar estilos** aos componentes no React Native.  
Ele ajuda a deixar o código mais limpo e performático, pois o React Native otimiza os estilos criados com ele.

Você precisa **importar** o `StyleSheet` do React Native:

```javascript
import { StyleSheet, Text, View } from 'react-native';
````

---

## ✨ Criando um StyleSheet

O estilo é criado chamando o método `StyleSheet.create()` e passando um **objeto de estilos**, como se fosse um CSS em JavaScript:

```javascript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    color: '#333',
    fontWeight: 'bold',
  },
});
```

---

## 🎯 Aplicando estilos aos componentes

Para aplicar o estilo, usamos a **propriedade `style`** no componente, referenciando o objeto dentro do `styles`:

```javascript
export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao meu App!</Text>
    </View>
  );
}
```

---

## 🧱 Vários estilos no mesmo componente

Você pode aplicar **mais de um estilo** ao mesmo componente, passando um **array de estilos**:

```javascript
<Text style={[styles.title, styles.highlight]}>
  Texto com dois estilos
</Text>
```

```javascript
const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    color: 'black',
  },
  highlight: {
    backgroundColor: 'yellow',
  },
});
```

---

## ⚙️ Propriedades mais usadas

| Categoria                   | Propriedades comuns                                     | Exemplo                               |
| --------------------------- | ------------------------------------------------------- | ------------------------------------- |
| **Layout**                  | `flex`, `alignItems`, `justifyContent`, `flexDirection` | `flex: 1`, `justifyContent: 'center'` |
| **Texto**                   | `fontSize`, `fontWeight`, `color`, `textAlign`          | `fontSize: 18`, `color: '#333'`       |
| **Cores e fundo**           | `backgroundColor`, `borderColor`, `borderWidth`         | `backgroundColor: '#fff'`             |
| **Espaçamento**             | `margin`, `padding`, `marginTop`, `paddingHorizontal`   | `padding: 10`, `marginTop: 20`        |
| **Dimensões**               | `width`, `height`                                       | `width: 100`, `height: 50`            |
| **Bordas e arredondamento** | `borderRadius`, `borderWidth`                           | `borderRadius: 8`                     |

---

## 💡 Dicas importantes

1. 🎨 Use **camelCase** — Exemplo: `backgroundColor` (não `background-color`).
2. 📏 As medidas são **números** (sem “px”) → `fontSize: 16`.
3. 🧠 Organize os estilos por tipo (container, texto, botão…).
4. 🧩 Evite estilos inline — use sempre o `StyleSheet.create()` para facilitar a manutenção.

---

## ✅ Exemplo completo

```javascript
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Olá, React Native!</Text>
      <Text style={[styles.subtitle, styles.highlight]}>
        Estilizando com StyleSheet!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3F2FD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0D47A1',
  },
  subtitle: {
    fontSize: 18,
    color: '#1565C0',
  },
  highlight: {
    backgroundColor: '#BBDEFB',
    padding: 5,
    borderRadius: 8,
  },
});
```

---

## 🧠 Exercício

Crie uma tela simples com:

- Um logo
- Um formulário de cadastro
- Um botão com alert

Use o `StyleSheet.create()` e aplique **cores, espaçamento e alinhamento**.
