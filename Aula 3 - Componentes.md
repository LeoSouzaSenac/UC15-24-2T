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

export default function Saudacao() {
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

### Exemplo com tipagem inline:

```tsx
import { Text } from 'react-native';

export default function Saudacao(props: { nome: string }) {
  return <Text>Olá, {props.nome}!</Text>;
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

export default function Botao(props: { titulo: string; aoPressionar: () => void }) {
  return <Button title={props.titulo} onPress={props.aoPressionar} />;
}
```

### Usando:

```tsx
<Botao titulo="Salvar" aoPressionar={() => alert('Salvo!')} />
<Botao titulo="Cancelar" aoPressionar={() => alert('Cancelado!')} />
```

---

## 🧱 Componentes dentro de componentes

```tsx
import { View, Text } from 'react-native';

function Saudacao(props: { nome: string }) {
  return <Text>Olá, {props.nome}!</Text>;
}

function Perfil(props: { nome: string; idade: number }) {
  return (
    <View>
      <Saudacao nome={props.nome} />
      <Text>Idade: {props.idade}</Text>
    </View>
  );
}

export default function App() {
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

function Botao(props: { titulo: string; aoPressionar: () => void }) {
  return <Button title={props.titulo} onPress={props.aoPressionar} />;
}

function Saudacao(props: { nome: string }) {
  return <Text style={styles.titulo}>Olá, {props.nome}!</Text>;
}

function Perfil(props: { nome: string; idade: number }) {
  return (
    <View style={styles.container}>
      <Saudacao nome={props.nome} />
      <Text style={styles.texto}>Idade: {props.idade}</Text>
      <Botao
        titulo="Enviar mensagem"
        aoPressionar={() => Alert.alert('Mensagem', `Mensagem enviada para ${props.nome}`)}
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

export default function Botao(props: { titulo: string; aoPressionar: () => void }) {
  return <Button title={props.titulo} onPress={props.aoPressionar} />;
}
```

---

### 4. **Crie o componente `Saudacao.tsx`**

```tsx
import React from 'react';
import { Text, StyleSheet } from 'react-native';

export default function Saudacao(props: { nome: string }) {
  return <Text style={styles.texto}>Olá, {props.nome}!</Text>;
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

export default function Perfil(props: { nome: string; idade: number }) {
  return (
    <View style={styles.card}>
      <Saudacao nome={props.nome} />
      <Text style={styles.idade}>Idade: {props.idade}</Text>
      <Botao
        titulo="Enviar mensagem"
        aoPressionar={() => Alert.alert('Mensagem', `Enviado para ${props.nome}`)}
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

## Exercicio Rede Social

Atividade: Criar Página de Perfil em React Native com Componentes e Props

Desenvolva um projeto em React Native que represente a página de perfil de uma rede social.

Requisitos:

A tela deve conter:

A foto de perfil e o nome do usuário no topo da página.

Uma lista de componentes de post, criados separadamente.

Cada componente Post deve receber props com, no mínimo:

Texto da postagem.

Imagem (usando props para definir a imagem a ser exibida).

Botões interativos em cada post (como curtir, comentar ou compartilhar).

