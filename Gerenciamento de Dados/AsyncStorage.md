# **AsyncStorage em React Native**

## **1️⃣ O que é AsyncStorage**

O **AsyncStorage** é uma API de armazenamento local para React Native que permite salvar e recuperar **pequenos dados** 
de forma persistente no dispositivo do usuário. Ou seja, é basicamente um “mini banco de dados” local (LOCAL VIU?), 
ideal para guardar dados que devem persistir mesmo após o app ser fechado.

E aí você pode perguntar pra mim:
 - "Ele armazena como esses dados?" Em forma de string!
 - É assíncrono? Sim, é, então trabalha com promessas (promises), que nem caloteiro.
 - E pra que que eu vou usar essa bagaça? Pra salvar **configurações, tokens, caches pequenos¹, preferências do usuário**, ou seja, coisas que não faz sentido armazenar num banco de dados real.
 - Alguma ressalva pra usar isso? Sim, duas: a primeira é NÃO USE ESSA JOÇA PRA ARMAZENAR SENHA (ou qualquer dado sensível). Sério, se fizer isso eu rasgo o diploma. Também não serve pra grandes volumes de dados, pois aí o celular sofre, coitado. 

* Não é recomendado para armazenar **dados sensíveis ou grandes volumes**.
*1 - Cache não é cachê, de dinheiro pra receber. Se fala 'késh' inclusive, e simboliza dados temporários, tipo respostas de API que não mudam frequentemente,
  últimos posts visualizados,  etc etc.*
---

## **2️⃣ SÓ PRA GARANTIR: Quando usar AsyncStorage**

AsyncStorage é recomendado quando você precisa de **persistência simples e rápida** no dispositivo, como:

* Tokens de autenticação (JWT)
* Preferências de usuário (tema claro/escuro, idioma)
* Pequenos caches de dados que ajudam a evitar chamadas de API repetidas
* Estados do app que devem ser mantidos entre sessões

> Não usar AsyncStorage para:
>
> * Dados muito grandes (>5MB)
> * Informações sensíveis sem criptografia (como senhas ou dados bancários)
> * Banco de dados relacional complexo

---

## **3️⃣ Instalação**

### **React Native CLI**

```bash
npm install @react-native-async-storage/async-storage
```

### **Expo**

```bash
expo install @react-native-async-storage/async-storage
```

---

## **4️⃣ Importação**

```tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
```

---

## **5️⃣ Operações básicas**

### **Salvar dados**

```tsx
const salvarDados = async () => {
  try {
    // Criando um objeto para salvar
    const usuario = { nome: 'Leonardo', idade: 30 };
    // AsyncStorage só aceita string, por isso convertemos em JSON
    // setItem serve pra que será?
    await AsyncStorage.setItem('@usuario', JSON.stringify(usuario));
    console.log('Dados salvos com sucesso!');
  } catch (error) {
    console.log('Erro ao salvar dados:', error);
  }
};
```

* `@usuario` é a chave que identifica o dado.
* **Dica:** sempre use prefixos (`@`) para evitar conflitos de chave.
* setItem salva um dado no AyncStorage
---

### **Ler dados**

```tsx
// Função assíncrona para ler dados do AsyncStorage
const lerDados = async () => {
  try {
    // Tenta obter o valor armazenado no AsyncStorage usando a chave '@usuario'
    // AsyncStorage.getItem retorna uma promise que resolve para uma string ou null
    const jsonValue = await AsyncStorage.getItem('@usuario');

    // Se jsonValue não for null, convertemos a string JSON de volta para objeto
    // Caso seja null, significa que não há nenhum dado armazenado (faz sentido, não?), então usuario recebe null
    const usuario = jsonValue != null ? JSON.parse(jsonValue) : null;

    // Exibe no console os dados lidos (ou null, caso não exista)
    console.log('Dados lidos:', usuario);
  } catch (error) {
    // Caso ocorra algum erro ao tentar ler os dados, ele será capturado aqui
    // Por exemplo: problemas de permissão ou falha no AsyncStorage
    console.log('Erro ao ler dados:', error);
  }
};
```

* É necessário usar `JSON.parse` para converter a string de volta para objeto.

---

### **Remover dados**

```tsx
const removerDados = async () => {
  try {
  // Remove o item com a chave '@usuario'
    await AsyncStorage.removeItem('@usuario');
    console.log('Dados removidos!');
  } catch (error) {
    console.log('Erro ao remover dados:', error);
  }
};
```

---

### **Limpar todos os dados**

```tsx
const limparTudo = async () => {
  try {
    await AsyncStorage.clear();
    console.log('Tudo apagado!');
  } catch (error) {
    console.log('Erro ao limpar dados:', error);
  }
};
```

> Use `clear()` com cuidado, pois ele apaga todos os dados do AsyncStorage do app.

---

## **6️⃣ Exemplo profissional em TSX**

Vamos criar um exemplo completo de **tema do app persistente** usando AsyncStorage.

```tsx
import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Definindo a interface para o tipo de tema
interface Tema {
  modo: 'claro' | 'escuro';
}

export default function App() {
  const [tema, setTema] = useState<Tema>({ modo: 'claro' });

  // Carregar tema do AsyncStorage ao iniciar
  useEffect(() => {
    const carregarTema = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@tema');
        if (jsonValue) setTema(JSON.parse(jsonValue));
      } catch (error) {
        console.log('Erro ao carregar tema:', error);
      }
    };
    carregarTema();
  }, []);

  // Alternar entre tema claro e escuro
  const alternarTema = async () => {
    try {
      const novoTema: Tema = { modo: tema.modo === 'claro' ? 'escuro' : 'claro' };
      setTema(novoTema);
      await AsyncStorage.setItem('@tema', JSON.stringify(novoTema));
    } catch (error) {
      console.log('Erro ao salvar tema:', error);
    }
  };

  return (
    <View style={[styles.container, tema.modo === 'claro' ? styles.claro : styles.escuro]}>
      <Text style={tema.modo === 'claro' ? styles.textoClaro : styles.textoEscuro}>
        Tema atual: {tema.modo}
      </Text>
      <Button title="Alternar Tema" onPress={alternarTema} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  claro: {
    backgroundColor: '#fff',
  },
  escuro: {
    backgroundColor: '#333',
  },
  textoClaro: {
    color: '#000',
    marginBottom: 20,
  },
  textoEscuro: {
    color: '#fff',
    marginBottom: 20,
  },
});
```

✅ Explicação:

* Criamos uma **interface `Tema`** para tipar corretamente o estado.
* **useEffect** carrega os dados do AsyncStorage ao iniciar.
* Ao alternar o tema, salvamos o estado no AsyncStorage para que seja persistente.
* Estilização muda dinamicamente de acordo com o tema.

---

## **7️⃣ Dicas de uso**

1. **Prefira JSON para objetos**
   Sempre que salvar arrays ou objetos, use `JSON.stringify` e `JSON.parse`.

2. **Use prefixos nas chaves**
   Ex.: `@usuario`, `@tema`, `@token`. Evita conflitos com outras bibliotecas.

3. **Tratamento de erros é obrigatório**
   AsyncStorage pode falhar por falta de espaço ou problemas no dispositivo.

4. **Evite dados sensíveis**
   Se precisar guardar senhas ou tokens, considere **SecureStore** ou criptografia.

5. **Evite salvar grandes volumes**
   AsyncStorage não é otimizado para grandes bases de dados.

---

## **8️⃣ Resumo**

* AsyncStorage = armazenamento local simples e persistente.
* Ideal para preferências, tokens e caches pequenos.
* Sempre use **try/catch**.
* Salvar objetos → `JSON.stringify`; Ler objetos → `JSON.parse`.
* Cuidado com dados sensíveis e volumes grandes.

