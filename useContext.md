# ⚛️ React Native – Hook `useContext`

## 🧩 O que é Contexto?

No **React Native**, o **Contexto** funciona igual ao React Web:
é uma forma de **compartilhar dados entre componentes** sem precisar passar props manualmente em vários níveis.

Serve para:

✅ Evitar o *prop drilling* (passar props de pai → filho → neto → bisneto)
✅ Criar estados globais acessíveis por vários componentes
✅ Centralizar dados como tema, usuário logado, idioma etc.

---

# ⚙️ EXEMPLO 0 — PROP DRILLING (sem contexto)

---

### 📄 `src/components/BotaoTemaPD.tsx`

```tsx
// ==========================================
// ARQUIVO: src/components/BotaoTemaPD.tsx
// ==========================================

import React from "react";
import { Button } from "react-native";

// Este componente está em um nível "baixo" na hierarquia.
// Ele precisa mudar o tema, mas para isso depende que os dados
// sejam enviados via props desde o componente principal (App).
// Isso é o famoso PROP DRILLING.

interface BotaoTemaPDProps {
  temaEscuro: boolean;
  setTemaEscuro: React.Dispatch<React.SetStateAction<boolean>>;
}

export const BotaoTemaPD = ({ temaEscuro, setTemaEscuro }: BotaoTemaPDProps) => {
  return (
    <Button
      title={temaEscuro ? "Mudar para Claro" : "Mudar para Escuro"}
      onPress={() => setTemaEscuro(!temaEscuro)} // alterna o tema
    />
  );
};
```

---

### 📄 `src/components/ConteudoPD.tsx`

```tsx
// ==========================================
// ARQUIVO: src/components/ConteudoPD.tsx
// ==========================================

import React from "react";
import { View, Text } from "react-native";
import { BotaoTemaPD } from "./BotaoTemaPD";

// Este componente está no meio da hierarquia.
// Ele não usa o tema diretamente, mas precisa RECEBER e REPASSAR
// as props para o próximo nível (BotaoTemaPD).
// Isso deixa o código mais trabalhoso e difícil de manter.

interface ConteudoPDProps {
  temaEscuro: boolean;
  setTemaEscuro: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ConteudoPD = ({ temaEscuro, setTemaEscuro }: ConteudoPDProps) => {
  return (
    <View>
      <Text style={{ color: temaEscuro ? "#fff" : "#000" }}>
        Tema atual: {temaEscuro ? "Escuro" : "Claro"}
      </Text>

      {/* repassando props manualmente */}
      <BotaoTemaPD temaEscuro={temaEscuro} setTemaEscuro={setTemaEscuro} />
    </View>
  );
};
```

---

### 📄 `src/AppPropDrilling.tsx`

```tsx
// ==========================================
// ARQUIVO: src/AppPropDrilling.tsx
// ==========================================

import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ConteudoPD } from "./components/ConteudoPD";

// EXEMPLO SEM CONTEXTO (PROP DRILLING)
//
// Aqui, o estado do tema (escuro/claro) está no App.
// Para que componentes "netos" consigam acessar ou alterar o tema,
// precisamos passar as props manualmente até lá.
// Isso é ineficiente e deixa o código verboso.

export default function AppPropDrilling() {
  const [temaEscuro, setTemaEscuro] = useState(false);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: temaEscuro ? "#333" : "#fff" },
      ]}
    >
      <Text style={{ color: temaEscuro ? "#fff" : "#000", marginBottom: 10 }}>
        Exemplo sem Contexto (Prop Drilling)
      </Text>

      {/* Aqui passamos o tema e a função manualmente */}
      <ConteudoPD temaEscuro={temaEscuro} setTemaEscuro={setTemaEscuro} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
```

🧠 **Problema:**
Cada componente precisa receber e repassar `temaEscuro` e `setTemaEscuro`, mesmo que não use diretamente.
Isso é o famoso **prop drilling**.

---

## 🎬 Exemplo 1 – Tema Claro/Escuro com Contexto

Agora vamos resolver o mesmo problema **usando Contexto**.

### 📂 Estrutura de pastas

```
/src
  /context
    TemaContext.tsx
  /components
    ComponenteBotao.tsx
    Tela.tsx
  App.tsx
```

---

### 1️⃣ TemaContext.tsx

```tsx
// =====================================
// ARQUIVO: src/context/TemaContext.tsx
// =====================================

import React, {
  createContext,
  useState,
  useContext,
  type ReactNode,
} from "react";

// =====================================
// 1️⃣ Tipo do contexto
// =====================================
// Aqui definimos o "formato" dos dados que estarão disponíveis globalmente

interface TemaContextType {
  temaEscuro: boolean; // indica se o tema está escuro (true) ou claro (false)
  setTemaEscuro: React.Dispatch<React.SetStateAction<boolean>>; // função para mudar o tema
}

// =====================================
// 2️⃣ Criando o contexto
// =====================================

// Aqui estamos fazendo a criação do contexto em si — o “objeto global” que vai guardar e compartilhar informações (no caso, o estado do tema) entre os componentes da aplicação React.
// Inicialmente é undefined, pois só existe quando o Provider envolver o app
const TemaContext = createContext<TemaContextType | undefined>(undefined);

// =====================================
// 3️⃣ Provider (fornecedor dos dados)
// =====================================
// Ele "envolve" a aplicação e permite que todos os filhos
// acessem o tema sem precisar de props
export const TemaProvider = (props: { children: ReactNode }) => {
  const [temaEscuro, setTemaEscuro] = useState(false); // tema inicial = claro

  return (
    <TemaContext.Provider value={{ temaEscuro, setTemaEscuro }}>
      {props.children}
    </TemaContext.Provider>
  );
};

// =====================================
// 4️⃣ Hook personalizado para usar o contexto
// =====================================
// Evita precisar escrever useContext(TemaContext) toda hora
export const useTema = (): TemaContextType => {
  const context = useContext(TemaContext);
  if (!context)
    throw new Error("useTema deve ser usado dentro de um TemaProvider");
  return context;
};
```

---

### 2️⃣ ComponenteBotao.tsx

```tsx
// =====================================
// ARQUIVO: src/components/ComponenteBotao.tsx
// =====================================

import React from "react";
import { Button } from "react-native";
import { useTema } from "../context/TemaContext";

// =====================================
// Botão que acessa o contexto e muda o tema
// =====================================
export const ComponenteBotao = () => {
  const { temaEscuro, setTemaEscuro } = useTema(); // pegando os dados globais

  return (
    <Button
      title={temaEscuro ? "Mudar para Claro" : "Mudar para Escuro"}
      onPress={() => setTemaEscuro(!temaEscuro)} // alterna o tema
    />
  );
};
```

---

### 3️⃣ Tela.tsx

```tsx
// =====================================
// ARQUIVO: src/components/Tela.tsx
// =====================================

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTema } from "../context/TemaContext";
import { ComponenteBotao } from "./ComponenteBotao";

// =====================================
// Tela principal que usa o tema global
// =====================================
export const Tela = () => {
  const { temaEscuro } = useTema();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: temaEscuro ? "#333" : "#fff" },
      ]}
    >
      <Text style={[styles.texto, { color: temaEscuro ? "#fff" : "#000" }]}>
        Tema atual: {temaEscuro ? "Escuro" : "Claro"}
      </Text>
      <ComponenteBotao />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  texto: {
    fontSize: 20,
  },
});
```

---

### 4️⃣ App.tsx

```tsx
// =====================================
// ARQUIVO: src/App.tsx
// =====================================

import React from "react";
import { TemaProvider } from "./context/TemaContext";
import { Tela } from "./components/Tela";

// =====================================
// O TemaProvider envolve a tela inteira
// =====================================
export default function App() {
  return (
    <TemaProvider>
      <Tela />
    </TemaProvider>
  );
}
```

🧠 **Agora:**

* Nenhum componente precisa mais receber `props` manuais.
* Todos os componentes dentro de `<TemaProvider>` têm acesso ao mesmo estado global.
* O código fica mais limpo, organizado e fácil de manter.

---

## 🎬 Exemplo 2 – Usuário Logado

Um segundo exemplo de uso do contexto no React Native.

### 📄 UsuarioContext.tsx

```tsx
// =====================================
// ARQUIVO: src/context/UsuarioContext.tsx
// =====================================

import React, { createContext, useState, useContext, ReactNode } from "react";

type Usuario = { nome: string } | null;
type UsuarioContextType = {
  usuario: Usuario;
  setUsuario: React.Dispatch<React.SetStateAction<Usuario>>;
};

const UsuarioContext = createContext<UsuarioContextType | undefined>(undefined);

export const UsuarioProvider = ({ children }: { children: ReactNode }) => {
  const [usuario, setUsuario] = useState<Usuario>(null); // começa sem usuário logado

  return (
    <UsuarioContext.Provider value={{ usuario, setUsuario }}>
      {children}
    </UsuarioContext.Provider>
  );
};

export const useUsuario = () => {
  const context = useContext(UsuarioContext);
  if (!context)
    throw new Error("useUsuario deve ser usado dentro de UsuarioProvider");
  return context;
};
```

---

### 📄 TelaUsuario.tsx

```tsx
// =====================================
// ARQUIVO: src/components/TelaUsuario.tsx
// =====================================

import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useUsuario } from "../context/UsuarioContext";

export const TelaUsuario = () => {
  const { usuario, setUsuario } = useUsuario();

  return (
    <View style={styles.container}>
      {usuario ? (
        <Text style={styles.texto}>Olá, {usuario.nome}!</Text>
      ) : (
        <Text style={styles.texto}>Nenhum usuário logado</Text>
      )}

      <Button title="Login como João" onPress={() => setUsuario({ nome: "João" })} />
      <View style={{ height: 10 }} />
      <Button title="Logout" color="red" onPress={() => setUsuario(null)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  texto: {
    fontSize: 18,
    marginBottom: 20,
  },
});
```

---

### 📄 App.tsx (para o contexto de usuário)

```tsx
// =====================================
// ARQUIVO: src/App.tsx
// =====================================

import React from "react";
import { UsuarioProvider } from "./context/UsuarioContext";
import { TelaUsuario } from "./components/TelaUsuario";

export default function App() {
  return (
    <UsuarioProvider>
      <TelaUsuario />
    </UsuarioProvider>
  );
}
```

---

## 🧠 Conclusão

| Sem Contexto (Prop Drilling)              | Com Contexto (useContext)           |
| ----------------------------------------- | ----------------------------------- |
| Props precisam ser repassadas manualmente | Dados ficam disponíveis globalmente |
| Código longo e repetitivo                 | Código limpo e centralizado         |
| Difícil manutenção                        | Fácil adicionar novos componentes   |
