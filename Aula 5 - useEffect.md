# ⚛️ React Native – Hook `useEffect`

O **`useEffect`** é um dos **hooks mais poderosos e importantes** do React e do **React Native**.
Ele é o **responsável por executar ações automáticas** no momento certo — como **buscar dados**, **atualizar informações**, **iniciar temporizadores** ou **limpar recursos** quando o componente sai da tela.

---

## 🧩 O que é o `useEffect`?

O `useEffect` é um **hook** que permite **executar código automaticamente** em resposta a:

* Mudanças de estado (`useState`)
* Mudanças de propriedades (props)
* Ou simplesmente quando o componente **entra** ou **sai da tela**

---

## 🧠 O que ele resolve?

O React **não executa código fora da renderização** de forma automática.
Se você tentar, por exemplo, buscar dados de uma API diretamente dentro do componente,
isso causará **problemas sérios** (como loops infinitos ou dados desatualizados).

Por isso o React criou o `useEffect`:
👉 É o **lugar certo** para colocar **efeitos colaterais** (ou *side effects*), ou seja, **ações que afetam algo fora da tela**.

---

## 📚 O que é um efeito colateral?

**Efeito colateral** é tudo que o seu componente faz *fora de retornar a interface*.
Ou seja, ações que **interagem com o mundo externo**.

| Tipo de Ação                                | Exemplo                     | Deve estar no `useEffect`? |
| ------------------------------------------- | --------------------------- | -------------------------- |
| Atualizar estado local                      | `setContador(contador + 1)` | ❌ Não                      |
| Buscar dados de uma API                     | `fetch(...)`                | ✅ Sim                      |
| Usar `setInterval` ou `setTimeout`          | ⏱️                          | ✅ Sim                      |
| Acessar armazenamento local                 | `AsyncStorage`              | ✅ Sim                      |
| Adicionar ou remover “listeners” de eventos | 📱                          | ✅ Sim                      |
| Fazer log quando algo muda                  | `console.log()` com estado  | ✅ Sim                      |

---

## 🎬 Sintaxe básica

```tsx
useEffect(() => {
  // código que será executado automaticamente
}, [dependencias]);
```

### 🧩 Partes importantes:

| Parte            | O que faz                                               |
| ---------------- | ------------------------------------------------------- |
| `() => { ... }`  | Função que contém o código a ser executado              |
| `[dependencias]` | Lista de variáveis que, quando mudam, disparam o efeito |

---

## 🧮 Exemplo 1 – Roda em toda renderização

```tsx
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";

export default function Exemplo1() {
  const [contador, setContador] = useState(0);

  // ✅ useEffect sem dependências = roda em toda renderização
  useEffect(() => {
    console.log("O componente foi renderizado!");
  });

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20 }}>Renderizações: {contador}</Text>
      <Text
        onPress={() => setContador(contador + 1)}
        style={{ marginTop: 10, color: "blue" }}
      >
        ➕ Clique para renderizar
      </Text>
    </View>
  );
}
```

📘 Esse efeito **roda toda vez** que o componente é atualizado.
Geralmente, **evitamos esse tipo** de `useEffect`, pois pode gerar execuções desnecessárias.

---

## 🚀 Exemplo 2 – Roda apenas uma vez (na montagem)

```tsx
import React, { useEffect } from "react";
import { View, Text } from "react-native";

export default function Exemplo2() {
  useEffect(() => {
    console.log("O componente apareceu na tela!");
  }, []); // <- array vazio = só na primeira vez

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20 }}>👋 Componente montado!</Text>
    </View>
  );
}
```

💡 Quando o array está **vazio (`[]`)**, o código roda **apenas uma vez**, assim que o componente aparece.

🟢 **Usos comuns:**

* Buscar dados da API quando o app abre
* Iniciar um temporizador
* Configurar um listener

---

## ♻️ Exemplo 3 – Roda quando algo muda

```tsx
import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";

export default function Exemplo3() {
  const [contador, setContador] = useState(0);

  // ✅ Executa apenas quando o contador mudar
  useEffect(() => {
    console.log("O contador mudou:", contador);
  }, [contador]);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20 }}>Contador: {contador}</Text>
      <Button title="Aumentar" onPress={() => setContador(contador + 1)} />
    </View>
  );
}
```

👉 O efeito só é executado **quando `contador` mudar**.

---

## 🧹 Exemplo 4 – Limpando efeitos (função de retorno)

```tsx
import React, { useEffect } from "react";
import { View, Text } from "react-native";

export default function Exemplo4() {
  useEffect(() => {
    // Inicia um intervalo que executa a cada 2 segundos
    const intervalo = setInterval(() => {
      console.log("Executando a cada 2 segundos...");
    }, 2000);

    // 🧼 Função de limpeza: chamada quando o componente sai da tela
    return () => clearInterval(intervalo);
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20 }}>⏱️ Intervalo ativo</Text>
    </View>
  );
}
```

🧼 A função **retornada dentro do `useEffect`** é chamada **quando o componente sai da tela**
ou **antes do efeito rodar novamente**.
Serve para **limpar timers, listeners ou conexões abertas**.

---

## ⚡ Exemplo 5 – Busca de API (completa e comentada)

```tsx
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

export default function ListaUsuarios() {
  // Estado para armazenar os usuários
  const [usuarios, setUsuarios] = useState<any[]>([]);

  // useEffect com array vazio → roda apenas uma vez
  useEffect(() => {
    console.log("Buscando dados da API...");

    // Faz a requisição
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json()) // Converte a resposta para JSON
      .then((data) => setUsuarios(data)) // Atualiza o estado com os dados
      .catch((err) => console.error("Erro ao buscar usuários:", err));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>👥 Lista de Usuários</Text>
      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text style={styles.item}>• {item.name}</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 30 },
  titulo: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  item: { fontSize: 18, marginVertical: 4 },
});
```

🧩 **Explicação:**

1. O `useEffect` roda **só quando o componente é montado**.
2. O código faz a requisição à API.
3. Quando os dados chegam, `setUsuarios` atualiza o estado.
4. A tela é atualizada automaticamente com a lista.

---

## ⏱️ Exemplo 6 – Atualizando com base no tempo

```tsx
import React, { useEffect } from "react";
import { View, Text } from "react-native";

export default function Exemplo6() {
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("3 segundos se passaram!");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20 }}>⏳ Esperando 3 segundos...</Text>
    </View>
  );
}
```

💡 Aqui o `useEffect` **executa uma vez** e **limpa** o temporizador quando o componente sai da tela.

---

## 🧩 Exemplo 7 – Reagindo a mudanças de estado

```tsx
import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";

export default function Exemplo7() {
  const [contador, setContador] = useState(0);

  // Executa sempre que o contador for atualizado
  useEffect(() => {
    console.log("O contador foi atualizado para:", contador);
  }, [contador]);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20 }}>🔢 Contador: {contador}</Text>
      <Button title="Aumentar" onPress={() => setContador(contador + 1)} />
    </View>
  );
}
```

---

## 💡 Dica: diferença entre antes e depois da atualização

```tsx
function aumentar() {
  setContador(contador + 1);
  console.log(contador); // ❌ Mostra o valor antigo
}
```

✅ Correto com `useEffect`:

```tsx
useEffect(() => {
  console.log("Agora o contador foi realmente atualizado:", contador);
}, [contador]);
```

---

## 🧮 Tipagem com TypeScript

```tsx
import React, { useEffect, useState } from "react";

export default function TipagemExemplo() {
  const [nome, setNome] = useState<string>("Leonardo");

  useEffect(() => {
    console.log(`Nome atual: ${nome}`);
  }, [nome]);

  return <Text>Olá, {nome}!</Text>;
}
```

---

## ⚙️ Resumo rápido

| Situação               | Quando o `useEffect` executa | Exemplo                                        |
| ---------------------- | ---------------------------- | ---------------------------------------------- |
| Sem dependências       | Em toda renderização         | `useEffect(() => {...});`                      |
| Array vazio `[]`       | Só uma vez (montagem)        | `useEffect(() => {...}, []);`                  |
| Com dependências `[x]` | Quando `x` muda              | `useEffect(() => {...}, [x]);`                 |
| Com retorno            | Na desmontagem               | `useEffect(() => { return () => {...} }, []);` |

---

## 🧭 Conclusão

O `useEffect` é o **cérebro reativo** do React Native.
Ele permite que seu aplicativo **reaja automaticamente** às mudanças, **busque dados**, **controle temporizadores** e **limpe recursos** corretamente.

> 🧩 **Em resumo:**
>
> * `useState` = guarda e muda dados
> * `useEffect` = reage às mudanças e executa ações automáticas

---

### 💬 Frase para guardar:

> 🔹 “O `useState` muda os dados.
> 🔹 O `useEffect` reage quando esses dados mudam.”
