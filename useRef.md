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


