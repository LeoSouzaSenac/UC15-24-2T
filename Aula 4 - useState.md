# 📱 React Native – Hook `useState`

O **`useState`** é um dos hooks mais importantes do React e também é usado no **React Native**.
Ele permite adicionar **estado** aos componentes funcionais — ou seja, variáveis que guardam informações e que, quando mudam, fazem a **interface se atualizar automaticamente**.

---

## 🧩 O que é o `useState`?

* É uma função que retorna um **par**: o valor atual e uma função para alterá-lo.
* Permite que seu app tenha **dados dinâmicos**, como o texto de um campo, a contagem de cliques, o estado de um botão, etc.

```tsx
const [valor, setValor] = useState(valorInicial);
```

* `valor`: guarda o estado atual.
* `setValor`: é a função que muda esse estado.
* `valorInicial`: é o valor com o qual o estado começa.

---

## 🎯 Entendendo a desestruturação de array

O `useState` **retorna um array com dois valores**, então usamos **desestruturação** para pegá-los rapidamente.

### Exemplo simples:

```tsx
const caixa = [10, 20];
const [a, b] = caixa;

console.log(a); // 10
console.log(b); // 20
```

No caso do `useState`, fazemos o mesmo:

```tsx
const [contador, setContador] = useState(0);
```

Isso é o mesmo que:

```tsx
const resultado = useState(0);
const contador = resultado[0];
const setContador = resultado[1];
```

Mas usando **desestruturação**, o código fica muito mais limpo.

---

## 📦 Analogia: a caixa de ovos 🥚

Imagine que o `useState` te dá uma caixinha com **dois ovos**:

1. O primeiro ovo é o **valor atual** (`contador`)
2. O segundo ovo é a **função para mudar o valor** (`setContador`)

Você tira os “ovos da caixa” com desestruturação:

```tsx
const [valor, mudarValor] = useState(0);
```

---

## ✅ Resumo rápido

| Termo técnico    | Explicação simples                           |
| ---------------- | -------------------------------------------- |
| Array            | Lista de valores                             |
| Desestruturação  | Tirar os itens da lista e dar nomes          |
| `useState(0)`    | Retorna uma lista: `[valor, função]`         |
| `[a, b] = array` | Extrai os dois valores e guarda em `a` e `b` |

---

## 🧠 Por que isso é útil em React Native?

Porque **interfaces móveis** são cheias de mudanças dinâmicas:

* Contadores
* Campos de texto
* Alternar botões (ligar/desligar)
* Mostrar/esconder elementos
* Alterar temas (claro/escuro)

Tudo isso é feito com **estado** — e o `useState` é o jeito mais simples de criar e controlar esses valores.

---

## 🧩 Exemplo prático com React Native (TSX)

```tsx
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function Contador() {
  // Declarando o estado 'contador' com valor inicial 0
  const [contador, setContador] = useState<number>(0);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Você clicou {contador} vezes</Text>

      <Button
        title="Clique aqui"
        onPress={() => setContador(contador + 1)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 10,
  },
});
```

---

### 🔍 Como funciona:

1. O estado `contador` começa em **0**.
2. Quando o botão é pressionado (`onPress`), executamos `setContador(contador + 1)`.
3. Isso muda o estado — e o React Native **re-renderiza** o componente, mostrando o novo valor.

---

## ⚙️ Dica técnica – Atualizando com base no valor anterior

Se o novo valor depende do anterior, use uma **função de atualização**:

```tsx
setContador(prev => prev + 1);
```

Isso evita problemas em casos com múltiplas atualizações simultâneas.

---

## 🧮 Tipagem no TypeScript

Você pode **tipar** o estado indicando o tipo do dado entre `< >`:

```tsx
const [nome, setNome] = useState<string>('Leonardo');
const [idade, setIdade] = useState<number>(25);
const [ativo, setAtivo] = useState<boolean>(true);
```

Assim o TypeScript ajuda a evitar erros de tipo no código.

---

## 🧰 Outros exemplos rápidos

### 1️⃣ Guardando texto de um campo

```tsx
const [texto, setTexto] = useState<string>('');

<TextInput
  style={styles.input}
  placeholder="Digite algo"
  value={texto}
  onChangeText={setTexto}
/>

<Text>Você digitou: {texto}</Text>
```

---

### 2️⃣ Alternando um estado booleano

```tsx
const [visivel, setVisivel] = useState<boolean>(false);

<Button
  title={visivel ? "Esconder texto" : "Mostrar texto"}
  onPress={() => setVisivel(!visivel)}
/>

{visivel && <Text>Texto visível!</Text>}
```

---

## 🧭 Conclusão

O `useState` é essencial em **React Native** para lidar com dados que mudam.
Sempre que seu app precisar **reagir a interações do usuário** — como digitar, clicar ou alternar algo —, use o `useState` para armazenar e atualizar esses valores.
