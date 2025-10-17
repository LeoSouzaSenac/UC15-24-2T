## 📱 Componentes em React Native

---

## 🧩 O que é um componente?

Um **componente** é uma **parte reutilizável da interface** do seu aplicativo.
No React Native, usamos componentes para montar a interface com elementos como `View`, `Text`, `Button`, etc.

> Componentes podem ser pequenos (como um botão) ou grandes (como uma tela inteira).

---

## 🎯 Por que usar componentes?

* Organiza o código em blocos reutilizáveis.
* Facilita a manutenção e o entendimento do projeto.
* Permite reutilização com diferentes dados usando **props**.

---

## ⚙️ Como criar um componente funcional

Usamos funções que retornam JSX.

### ✅ Exemplo:

```tsx
import React from 'react';
import { Text } from 'react-native';

function Saudacao() {
  return <Text>Olá, mundo!</Text>;
}
```

Para usar:

```tsx
<Saudacao />
```

---

## 📦 Passando e recebendo **props**

**Props** são dados enviados para o componente.

### Exemplo:

```tsx
function Saudacao(props) {
  return <Text>Olá, {props: {nome:string}!</Text>;
}

// Usando o componente
<Saudacao nome="Maria" />
```

🖥️ **Resultado:**

```
Olá, Maria!
```

---

## 🔁 Reutilizando componentes

Você pode usar o mesmo componente várias vezes com props diferentes.

```tsx
import { Button } from 'react-native';

function Botao(props) {
  return <Button title={props.titulo} onPress={props.aoPressionar} />;
}

function App() {
  return (
    <>
      <Botao titulo="Salvar" aoPressionar={() => alert('Salvo!')} />
      <Botao titulo="Cancelar" aoPressionar={() => alert('Cancelado!')} />
    </>
  );
}

```

---

## 🧱 Componentes dentro de componentes

```tsx
import { View, Text } from 'react-native';

function Perfil({ nome, idade }) {
  return (
    <View>
      <Saudacao nome={nome} />
      <Text>Idade: {idade}</Text>
    </View>
  );
}

function Saudacao({ nome }) {
  return <Text>Olá, {nome}!</Text>;
}

function App() {
  return <Perfil nome="Carlos" idade={28} />;
}
```

---

## 📝 Resumo rápido

| Conceito     | Explicação                                       |
| ------------ | ------------------------------------------------ |
| Componente   | Bloco reutilizável de interface                  |
| Props        | Dados enviados de um componente pai para o filho |
| Reutilização | Usar o mesmo componente com diferentes props     |
| Aninhamento  | Usar componentes dentro de outros componentes    |

---

## 🚀 Exemplo completo em React Native com `.tsx`

```tsx
import React from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';

function Botao({ titulo, aoPressionar }) {
  return <Button title={titulo} onPress={aoPressionar} />;
}

function Saudacao({ nome }) {
  return <Text style={styles.titulo}>Olá, {nome}!</Text>;
}

function Perfil({ nome, idade }) {
  return (
    <View style={styles.container}>
      <Saudacao nome={nome} />
      <Text style={styles.texto}>Idade: {idade}</Text>
      <Botao
        titulo="Enviar mensagem"
        aoPressionar={() => Alert.alert('Mensagem', `Mensagem enviada para ${nome}`)}
      />
    </View>
  );
}

export default function App() {
  return <Perfil nome="Ana" idade={22} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  texto: {
    fontSize: 18,
    marginBottom: 10,
  },
});
```

---

### 🧠 Dicas para alunos

* Props são **somente leitura** (não podem ser alteradas diretamente).
* Componentes sempre começam com **letra maiúscula**.
* Teste passar diferentes valores nas props (`<Perfil nome="João" idade={40} />`).

---

## 🛠️ Passo a passo: Criando um App simples e bonito com componentes

### ✅ Objetivo

Criar um app que exibe perfis de usuários com nome, idade e um botão para enviar uma mensagem.

---

### 1. **Crie o projeto**

Se estiver usando **Expo**:

```bash
npx create-expo-app MeuApp
cd MeuApp
npm run start
```

---

### 2. **Estrutura do app**

Organize seus arquivos assim:

```
/MeuApp
├── App.tsx
├── components/
│   ├── Botao.tsx
│   ├── Saudacao.tsx
│   └── Perfil.tsx
```

---

### 3. **Crie o componente `Botao.tsx`**

```tsx
import React from 'react';
import { Button } from 'react-native';

export default function Botao({ titulo, aoPressionar }) {
  return <Button title={titulo} onPress={aoPressionar} />;
}
```

---

### 4. **Crie o componente `Saudacao.tsx`**

```tsx
import React from 'react';
import { Text, StyleSheet } from 'react-native';

export default function Saudacao({ nome }) {
  return <Text style={styles.texto}>Olá, {nome}!</Text>;
}

const styles = StyleSheet.create({
  texto: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 8,
  },
});
```

---

### 5. **Crie o componente `Perfil.tsx`**

```tsx
import React from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import Saudacao from './Saudacao';
import Botao from './Botao';

export default function Perfil({ nome, idade }) {
  return (
    <View style={styles.card}>
      <Saudacao nome={nome} />
      <Text style={styles.idade}>Idade: {idade}</Text>
      <Botao
        titulo="Enviar mensagem"
        aoPressionar={() => Alert.alert('Mensagem', `Enviado para ${nome}`)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    marginBottom: 20,
    alignItems: 'center',
    width: '100%',
  },
  idade: {
    fontSize: 18,
    marginBottom: 10,
  },
});
```

---

### 6. **Use tudo no `App.tsx`**

```tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Perfil from './components/Perfil';

export default function App() {
  return (
    <View style={styles.container}>
      <Perfil nome="Ana" idade={22} />
      <Perfil nome="Lucas" idade={30} />
      <Perfil nome="Mariana" idade={27} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
});
```

---

### ✅ Resultado

Um app simples, visualmente limpo, com componentes reutilizáveis que recebem **props** para personalizar o conteúdo.
