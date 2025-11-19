# Acessibilidade no React Navigation Stack

O **React Navigation**, quando usado com **Stack Navigator**, pode apresentar desafios para leitores de tela (VoiceOver no iOS e TalkBack no Android). Isso acontece porque, ao navegar entre telas, a nova tela é renderizada sobre a anterior, mas o **foco de acessibilidade não é alterado automaticamente**.  

Neste documento, explicamos como lidar com isso e tornar suas telas acessíveis.

---

## 1. Problema principal

- Cada tela do Stack é renderizada e empilhada no stack.
- Leitores de tela **não detectam automaticamente** a mudança de contexto.
- Usuários podem não perceber que a navegação ocorreu.

---

## 2. Boas práticas para resolver

### a) Definir foco de acessibilidade no container principal

Você pode usar `AccessibilityInfo.setAccessibilityFocus` para garantir que o leitor de tela foque no container principal da tela.

```jsx
import { useEffect, useRef } from 'react';
import { View, Text, AccessibilityInfo, findNodeHandle } from 'react-native';

export default function Tela() {
  const viewRef = useRef(null);

  useEffect(() => {
    // useEffect roda após o componente ser renderizado
    const focusOnView = async () => {
      // findNodeHandle retorna a referência nativa do elemento
      const reactTag = findNodeHandle(viewRef.current);
      if (reactTag) {
        // Muda o foco de acessibilidade para este container
        AccessibilityInfo.setAccessibilityFocus(reactTag);
      }
    };

    focusOnView();
  }, []);

  return (
    // 'accessible={true}' indica que este container pode ser focado por leitores de tela
    <View ref={viewRef} accessible={true}>
      <Text>Bem-vindo à nova tela!</Text>
    </View>
  );
}
````

**Comentário:**

* `useRef` cria uma referência ao container da tela.
* `AccessibilityInfo.setAccessibilityFocus` força o leitor de tela a focar no container recém-renderizado.
* `accessible={true}` marca o elemento como focável por leitores de tela.

---

### b) Marcar títulos e elementos importantes

Use `accessible` e `accessibilityRole` para indicar elementos-chave:

```jsx
<Text
  accessible={true}          // Elemento focável
  accessibilityRole="header" // Indica que é um cabeçalho
>
  Título da Tela
</Text>
```

**Comentário:**

* Elementos com roles claros ajudam o leitor de tela a interpretar a estrutura da tela.
* Cabeçalhos (`header`) e botões (`button`) devem sempre ter roles definidos.

---

### c) Ajustes no Stack Navigator

No React Navigation, você pode melhorar a acessibilidade da tela diretamente nas opções do `Stack.Screen`:

```jsx
<Stack.Screen
  name="Home"
  component={HomeScreen}
  options={{
    headerShown: true,                // Exibe o cabeçalho padrão
    accessibilityElementsHidden: false, // Não oculta elementos para leitores de tela
    importantForAccessibility: "yes",  // Marca a tela como importante para acessibilidade
  }}
/>
```

**Comentário:**

* `accessibilityElementsHidden: false` garante que os elementos da tela atual sejam visíveis para leitores de tela.
* `importantForAccessibility: "yes"` indica que esta tela é relevante para a navegação acessível.

---

## 3. Resumo das recomendações

1. **Foco manual:** Sempre defina o foco de acessibilidade no container principal da nova tela.
2. **Roles e `accessible`:** Marque títulos, botões e elementos importantes com roles adequadas.
3. **Opções do Stack:** Use `importantForAccessibility` e `accessibilityElementsHidden` para priorizar a tela atual.
4. **Teste com leitores de tela:** Verifique com VoiceOver (iOS) e TalkBack (Android) para garantir que a navegação e o foco estejam corretos.

---

> Observação:
> O Stack Navigator **funciona com leitores de tela**, mas sem ajustes pode confundir usuários com deficiência visual. Sempre teste a navegação e o foco de cada tela.


