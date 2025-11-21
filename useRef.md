# Guia  `useRef` no React Native (TSX)

O `useRef` é um **hook do React** que permite criar uma referência **persistente entre renders**. Ele é usado principalmente para:

1. **Acessar elementos nativos diretamente** (como `TextInput` ou `ScrollView`).  
2. **Guardar valores que mudam sem disparar re-render** (valores temporários ou contadores de renderizações).

Diferente do `useState`, **alterar um ref não faz o componente renderizar de novo**.

---

## 1. Importando o `useRef` e outros componentes

```tsx
import React, { useRef, useState } from 'react'; // useRef para referência persistente, useState para estado normal
import { TextInput, Button, ScrollView, Text, View } from 'react-native'; 
// TextInput: campo de input
// Button: botão
// ScrollView: área rolável
// Text: exibição de texto
// View: container/layout
````

---

## 2. Por que usar `useRef`

O `useRef` serve **para guardar algo que você quer acessar ou mudar sem que o componente “re-renderize”**.

### **A) Acessar elementos nativos**

Exemplo: focar um input ao apertar um botão.

```tsx
import React, { useRef } from 'react';
import { TextInput, Button, View } from 'react-native';

export default function App() {
  // Criamos uma referência para o TextInput
  const inputRef = useRef<TextInput>(null); // inicialmente a ref aponta para null

  return (
    <View style={{ padding: 16 }}>
      {/* Associamos a ref ao TextInput */}
      <TextInput
        ref={inputRef}
        placeholder="Digite algo"
        style={{ borderWidth: 1, borderColor: '#000', padding: 8 }}
      />
      <Button
        title="Focar no input"
        onPress={() => {
          // Chamamos o método focus() do TextInput usando a ref
          inputRef.current?.focus(); // ? verifica se current existe antes de chamar focus()
        }}
      />
    </View>
  );
}
```

**Explicação:**

* `inputRef.current` aponta para o `TextInput`.
* Chamando `focus()`, ele ganha foco **sem renderizar nada**.

---

### **B) Guardar valores sem re-render**

Exemplo: contador de renders.

```tsx
import React, { useRef, useState } from 'react';
import { Button, Text, View } from 'react-native';

export default function App() {
  const renderCount = useRef(0); // contador de renders que não dispara re-render
  const [count, setCount] = useState(0); // contador normal que dispara render

  renderCount.current += 1; // incrementa renderCount a cada render do componente

  return (
    <View style={{ padding: 16 }}>
      <Text>Contador: {count}</Text>
      <Text>Renderizações: {renderCount.current}</Text>
      <Button title="Adicionar" onPress={() => setCount(count + 1)} />
    </View>
  );
}
```

**Explicação:**

* `renderCount.current` aumenta a cada render, mas **não dispara renderização extra**.
* `count` com `useState` dispara renderizações, mostrando diferença entre `useState` e `useRef`.

---

## 3. Sintaxe Básica

```tsx
const minhaRef = useRef<TipoDoElemento | null>(null);
```

* `TipoDoElemento`: tipo do componente que você quer referenciar, como `TextInput`.
* `null`: inicialmente a referência não aponta para nada.

---

## 4. Exemplo Prático: Scroll automático

```tsx
import React, { useRef } from 'react';
import { ScrollView, Text, Button, View } from 'react-native';

export default function App() {
  const scrollRef = useRef<ScrollView>(null); // referência para o ScrollView

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {/* Botão para rolar até o final */}
      <Button
        title="Ir para o final"
        onPress={() => {
          // Chamamos o método scrollToEnd() do ScrollView usando a ref
          scrollRef.current?.scrollToEnd({ animated: true }); // ? verifica se current existe
        }}
      />
      <ScrollView
        ref={scrollRef} // ligamos a ref ao ScrollView
        style={{ marginTop: 16, borderWidth: 1, height: 200 }}
      >
        {/* Criamos 30 itens para demonstrar o scroll */}
        {Array.from({ length: 30 }, (_, i) => (
          // _ representa o valor do elemento (não usado aqui)
          // i é o índice do elemento
          <Text key={i} style={{ padding: 8 }}>
            Item {i + 1}
          </Text>
        ))}
      </ScrollView>
    </View>
  );
}
```

**Explicação:**

* `scrollRef.current?.scrollToEnd()` rola o ScrollView até o final.
* `Array.from({ length: 30 }, (_, i) => ...)` cria um array de 30 elementos.

  * `_` é o valor do elemento, que não usamos.
  * `i` é o índice, usado para `key` e mostrar número do item.

---

## 5. Comparação rápida: `useRef` vs `useState`

| Recurso                | useState              | useRef                                           |
| ---------------------- | --------------------- | ------------------------------------------------ |
| Atualiza a tela        | Sim                   | Não                                              |
| Persiste entre renders | Sim                   | Sim                                              |
| Quando usar            | Valores que afetam UI | Valores temporários ou refs de elementos nativos |

---

## 6. Dicas importantes

1. `useRef` **não substitui o `useState`** – use `useState` quando a alteração precisa atualizar a interface.
2. Sempre cheque se `current` existe antes de chamar métodos (`inputRef.current?.focus()`).
3. Ideal para **acessar componentes nativos** ou **armazenar valores temporários sem renderizar**.

---

## 7. Resumo

| Uso                     | Exemplo                        |
| ----------------------- | ------------------------------ |
| Referência a componente | Focar input, scroll automático |
| Valores persistentes    | Contador de renders, timer     |
| Não disparar re-render  | Armazenar estado temporário    |

O `useRef` é essencial para criar **comportamentos avançados** e **otimizar renderizações** sem perder o controle sobre elementos nativos.

---

## Exercicio Jogo de Adivinhação com `useRef`

### **Objetivo**

Criar um jogo de adivinhação em React Native modularizado, onde:

* O aplicativo gera um **número secreto** que não é exibido na tela.
* O jogador digita palpites e recebe feedback (maior, menor ou acertou).
* O número de tentativas é **armazenado internamente com `useRef`** e **não é mostrado** na tela.
* O jogador perde se ultrapassar **10 tentativas**.

---

### **Estrutura de arquivos sugerida**

```
/MeuJogoAdivinhacao
│
├─ App.tsx                 // Componente principal que gerencia a lógica do jogo
├─ components/
│   ├─ InputPalpite.tsx    // Componente para o campo de input do palpite
│   ├─ BotaoEnviar.tsx     // Componente para o botão de envio
│   └─ Mensagem.tsx        // Componente para mostrar mensagem de feedback
```

---

### **Componentes e responsabilidades**

1. **App.tsx**

   * Gera o **número secreto** usando `useRef` ao iniciar o jogo.
   * Cria um `useRef` para contar **tentativas internas**.
   * Armazena o valor do input e a mensagem de feedback usando `useState`.
   * Importa e organiza os componentes `InputPalpite`, `BotaoEnviar` e `Mensagem`.
   * Lógica principal: verificar se o palpite está correto, maior ou menor, e se o jogador perdeu.

2. **InputPalpite.tsx**

   * Campo `TextInput` para o jogador digitar seu palpite.
   * Recebe props: valor atual e função para atualizar o valor.

3. **BotaoEnviar.tsx**

   * Botão que dispara a função de validação do palpite.
   * Recebe props: função a ser chamada ao clicar.

4. **Mensagem.tsx**

   * Mostra um `Text` com o feedback do jogo.
   * Recebe props: mensagem a ser exibida (ex.: “O número é maior”, “Você acertou”).

---

### **Hooks a utilizar**

* **useRef**

  * Guardar o **número secreto** (não precisa aparecer na tela).
  * Guardar o **contador de tentativas internas** (não mostrado na UI).

* **useState**

  * Guardar o valor digitado pelo jogador.
  * Atualizar a **mensagem de feedback** que será exibida na tela.

---

### **Funcionalidades obrigatórias**

1. Gerar um número aleatório entre 1 e 100 usando `useRef`.
2. Permitir que o jogador digite um palpite e envie usando o botão.
3. Comparar o palpite com o número secreto:

   * Se correto → mostrar mensagem de vitória.
   * Se incorreto → mostrar mensagem indicando se o número é maior ou menor.
4. Incrementar o contador de tentativas **internamente usando `useRef`**.
5. Se o jogador ultrapassar **10 tentativas** → mostrar mensagem de derrota e revelar o número secreto.
6. Limpar o campo de input após cada tentativa.

---

### **Extras opcionais**

* Botão para **reiniciar o jogo**, gerando um novo número secreto e zerando o contador de tentativas.
* Validar entradas inválidas (não números, valores fora do intervalo 1-100).

