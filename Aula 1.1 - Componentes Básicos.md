# 📘 Componentes Básicos do React Native

## 🎯 Objetivo da Aula
Conhecer os **componentes fundamentais** do React Native, entender para que servem e como utilizá-los com suas **principais propriedades**.

---

## ⚛️ O que são Componentes?

Em **React Native**, tudo é um **componente**.

Um **componente** é uma parte da interface do aplicativo — pode ser um **texto**, um **botão**, uma **imagem**, uma **caixa de entrada**, ou até uma **tela inteira**.

👉 Em resumo:  
> Um componente é um **bloco de construção** da interface do app.

---

## 🧩 Componentes Básicos do React Native

Abaixo estão os componentes mais importantes e mais usados em qualquer aplicação.

---

### 1️⃣ **View**

A `View` é o **componente base de layout** do React Native.  
Ela funciona como uma **div** no HTML e serve para agrupar outros componentes na tela.

```tsx
import { View, Text } from 'react-native';

export default function App() {
  return (
    <View style={{ backgroundColor: '#e0e0e0', padding: 20 }}>
      <Text>Olá, mundo!</Text>
    </View>
  );
}
````

#### 🔹 Propriedades mais usadas:

* `style`: define estilos (cor, tamanho, alinhamento, etc.)
* `flexDirection`: controla o layout (coluna ou linha)
* `alignItems` e `justifyContent`: centralizam conteúdo
* `backgroundColor`: define cor de fundo

---

### 2️⃣ **Text**

O componente `Text` exibe **textos na tela**.

```tsx
import { Text } from 'react-native';

<Text style={{ fontSize: 20, color: 'blue' }}>
  Seja bem-vindo ao React Native!
</Text>
```

#### 🔹 Propriedades mais usadas:

* `style`: altera fonte, tamanho, cor e alinhamento
* `numberOfLines`: limita o número de linhas
* `ellipsizeMode`: adiciona reticências (`"tail"`, `"head"`, `"middle"`)
* `onPress`: executa uma ação ao tocar no texto (como um botão)

---

### 3️⃣ **Image**

O `Image` mostra **imagens locais ou da internet**.

```tsx
import { Image } from 'react-native';

<Image 
  source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} 
  style={{ width: 100, height: 100 }}
/>
```

#### 🔹 Propriedades mais usadas:

* `source`: caminho da imagem (local ou online)
* `style`: largura, altura e bordas
* `resizeMode`: define o modo de ajuste (`cover`, `contain`, `stretch`, `center`)

---

### 4️⃣ **Button**

Cria um **botão simples** e fácil de usar.

```tsx
import { Button } from 'react-native';

<Button 
  title="Clique aqui" 
  onPress={() => alert('Botão pressionado!')} 
  color="#007AFF"
/>
```

#### 🔹 Propriedades mais usadas:

* `title`: texto exibido no botão
* `onPress`: função executada quando o botão é pressionado
* `color`: cor do botão (varia conforme a plataforma)

---

### 5️⃣ **TextInput**

Campo de **entrada de texto**, usado para digitar informações como nome, senha, etc.

```tsx
import { TextInput } from 'react-native';

<TextInput
  placeholder="Digite seu nome"
  style={{ borderWidth: 1, padding: 10, width: 200 }}
  onChangeText={(texto) => console.log(texto)}
/>
```

#### 🔹 Propriedades mais usadas:

* `placeholder`: texto de exemplo
* `value`: valor atual do campo
* `onChangeText`: executa uma função quando o texto muda
* `keyboardType`: tipo de teclado (`default`, `numeric`, `email-address`)
* `secureTextEntry`: oculta texto (para senhas)
* `maxLength`: número máximo de caracteres

---

### 6️⃣ **ScrollView**

Permite **rolar o conteúdo da tela** (útil quando há muitos elementos).

```tsx
import { ScrollView, Text } from 'react-native';

<ScrollView style={{ margin: 20 }}>
  <Text>Item 1</Text>
  <Text>Item 2</Text>
  <Text>Item 3</Text>
  {/* ...outros itens */}
</ScrollView>
```

#### 🔹 Propriedades mais usadas:

* `horizontal`: rolagem na horizontal
* `showsVerticalScrollIndicator`: mostra ou esconde a barra de rolagem
* `contentContainerStyle`: estilos aplicados dentro da área rolável

---

### 7️⃣ **TouchableOpacity**

Componente que cria **botões personalizados**, permitindo usar `View`, `Text`, ou `Image` dentro dele.

```tsx
import { TouchableOpacity, Text } from 'react-native';

<TouchableOpacity
  onPress={() => alert('Pressionado!')}
  style={{ backgroundColor: '#007AFF', padding: 10, borderRadius: 5 }}
>
  <Text style={{ color: '#fff' }}>Botão Customizado</Text>
</TouchableOpacity>
```

#### 🔹 Propriedades mais usadas:

* `onPress`: função ao clicar
* `activeOpacity`: define a opacidade ao pressionar
* `style`: personalização completa do botão

---

### 8️⃣ **FlatList**

Usado para **listas grandes** (melhor que o `ScrollView` para desempenho).

```tsx
import { FlatList, Text } from 'react-native';

const dados = [
  { id: '1', nome: 'Maria' },
  { id: '2', nome: 'João' },
  { id: '3', nome: 'Ana' },
];

<FlatList
  data={dados}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => <Text>{item.nome}</Text>}
/>
```

#### 🔹 Propriedades mais usadas:

* `data`: array de dados
* `renderItem`: função que mostra cada item
* `keyExtractor`: identifica cada elemento
* `horizontal`: lista na horizontal
* `numColumns`: número de colunas

---

## 🎨 Dica — Estilizando Componentes

Os estilos no React Native são feitos com o objeto `StyleSheet`:

```tsx
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  texto: {
    color: '#333',
    fontSize: 18,
  },
});
```

E aplicados assim:

```tsx
<View style={styles.container}>
  <Text style={styles.texto}>Texto Estilizado</Text>
</View>
```

---

## 🧠 Resumo

| Componente           | Função Principal         |
| -------------------- | ------------------------ |
| **View**             | Estrutura de layout      |
| **Text**             | Exibe texto              |
| **Image**            | Mostra imagens           |
| **Button**           | Cria botões simples      |
| **TextInput**        | Campo de entrada         |
| **ScrollView**       | Permite rolagem          |
| **TouchableOpacity** | Botão personalizado      |
| **FlatList**         | Lista otimizada de dados |

---

## 🧩 Desafio da Aula

Crie um pequeno app que exiba:

1. Um **título** (`Text`)
2. Uma **imagem**
3. Um **campo de texto**
4. Um **botão customizado** (`TouchableOpacity`) que, ao ser pressionado, mostre o texto digitado em um `alert`.

---

## ✅ Conclusão

Hoje você aprendeu:

* O que são componentes no React Native
* Como usar os principais elementos da interface
* Como personalizar estilos e lidar com eventos de clique e digitação

Esses componentes são a **base de qualquer aplicativo mobile** — a partir deles, construímos telas completas e interativas.

