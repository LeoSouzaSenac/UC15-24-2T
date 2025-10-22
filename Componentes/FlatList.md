# 📚 Guia Completo do FlatList no React Native

O **FlatList** é um componente do React Native usado para renderizar listas grandes de forma eficiente. Ele é otimizado para renderizar apenas os elementos visíveis na tela, economizando memória e melhorando a performance em comparação com `ScrollView` e `map()` simples.

---

## 🔹 Importando o FlatList

```tsx
import React, { useState } from "react";
import { FlatList, Text, View, StyleSheet } from "react-native";
```

---

## 🔹 Estrutura Básica

```tsx
const App = () => {
  const dados = ["Maçã", "Banana", "Laranja", "Uva"];

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <FlatList
        data={dados} // array de itens que serão renderizados
        renderItem={({ item }) => <Text>{item}</Text>} // como cada item será exibido
        keyExtractor={(item, index) => index.toString()} // chave única para cada item
      />
    </View>
  );
};

export default App;
```

---

## 🔹 Propriedades Principais do FlatList

Abaixo, explicamos cada propriedade essencial, seu propósito e valores esperados:

| Propriedade              | Tipo                      | O que faz                                                                      | Valor esperado / Observações                                 |
| ------------------------ | ------------------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------ |
| `data`                   | `Array<T>`                | Array de dados que a lista vai renderizar                                      | Ex.: `["item1","item2"]` ou `[ {id:1, nome:"item"} ]`        |
| `renderItem`             | `(info) => ReactElement`  | Função que define como cada item será renderizado                              | Recebe `{ item, index, separators }`                         |
| `keyExtractor`           | `(item, index) => string` | Gera uma chave única para cada item (obrigatório se os itens não tiverem `id`) | Deve retornar **string**                                     |
| `horizontal`             | `boolean`                 | Define se a lista será horizontal                                              | `true` ou `false` (padrão `false`)                           |
| `numColumns`             | `number`                  | Número de colunas em listas de grade                                           | Ex.: `2` cria 2 colunas                                      |
| `ListHeaderComponent`    | `ReactNode`               | Componente exibido antes da lista                                              | Pode ser `<View><Text>Header</Text></View>`                  |
| `ListFooterComponent`    | `ReactNode`               | Componente exibido após a lista                                                | Usado para loading ou rodapé                                 |
| `ItemSeparatorComponent` | `ReactNode`               | Componente usado como separador entre itens                                    | Ex.: `<View style={{ height:1, backgroundColor:'gray' }} />` |
| `initialNumToRender`     | `number`                  | Número inicial de itens renderizados                                           | Ex.: `10` renderiza os 10 primeiros itens inicialmente       |
| `onEndReached`           | `(info) => void`          | Função chamada quando o usuário chega no fim da lista                          | Usado para carregamento infinito                             |
| `onEndReachedThreshold`  | `number`                  | Distância do fim da lista para disparar `onEndReached`                         | Valor entre 0 e 1 (ex.: 0.5 = metade da lista antes do fim)  |
| `refreshing`             | `boolean`                 | Define se a lista está em modo “pull-to-refresh”                               | `true` ou `false`                                            |
| `onRefresh`              | `() => void`              | Função chamada ao fazer “pull-to-refresh”                                      | Deve atualizar o estado dos dados                            |

---

## 🔹 Exemplo Completo

```tsx
import React, { useState } from "react";
import { FlatList, Text, View, StyleSheet, Button } from "react-native";

type Item = {
  id: string;
  nome: string;
};

export default function App() {
  const [itens, setItens] = useState<Item[]>([
    { id: "1", nome: "Maçã" },
    { id: "2", nome: "Banana" },
    { id: "3", nome: "Laranja" },
    { id: "4", nome: "Uva" },
  ]);

  // Função chamada quando a lista é puxada para atualizar
  const atualizarLista = () => {
    setItens([...itens, { id: (itens.length + 1).toString(), nome: "Novo Item" }]);
  };

  return (
    <View style={styles.container}>
      {/* FlatList é o componente que renderiza a lista */}
      <FlatList
        data={itens} // array de dados
        keyExtractor={(item) => item.id} // chave única
        renderItem={({ item, index }) => (
          <Text style={styles.item}>
            {index + 1}. {item.nome}
          </Text>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListHeaderComponent={() => <Text style={styles.header}>Minha Lista</Text>}
        ListFooterComponent={() => <Button title="Adicionar Item" onPress={atualizarLista} />}
        initialNumToRender={2} // renderiza os 2 primeiros itens inicialmente
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  item: {
    fontSize: 18,
    padding: 10,
  },
  separator: {
    height: 1,
    backgroundColor: "gray",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
```

---

## 🔹 Tamanho do FlatList

* **FlatList precisa de um tamanho definido** para renderizar corretamente.
* Normalmente usamos `flex: 1` no container pai (`View`) para que ele ocupe toda a tela.
* Se o FlatList estiver dentro de uma `View` com altura fixa, ele respeitará essa altura.
* Diferente do `ScrollView`, o FlatList **renderiza só os itens visíveis**, por isso ele pode ter **performance melhor em listas grandes**.

```tsx
<View style={{ flex: 1 }}>
  <FlatList ... />
</View>
```

---

## 🔹 Dicas Importantes

1. **Sempre use `keyExtractor`** se o item não tiver `id`.
2. Para listas grandes, use `initialNumToRender` e `maxToRenderPerBatch` para performance.
3. Use `onEndReached` para implementar scroll infinito.
4. `horizontal` é útil para carrosséis de imagens.
5. Para grids, combine `numColumns` com `flex` nos itens.
