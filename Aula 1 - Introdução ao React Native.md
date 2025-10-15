# 📱 Aula 1 — Introdução à Programação Mobile com React Native (TypeScript)

## 🎯 Objetivo da Aula
Compreender o que é o **React Native**, a diferença entre ele e o **React** para web, como ele permite criar aplicativos móveis nativos usando **TypeScript**, e aprender a criar o **primeiro projeto com Expo Go**.

---

## 🌍 O que é React Native?

O **React Native** é um framework criado pelo **Facebook (Meta)** que permite desenvolver **aplicativos móveis nativos** para **Android e iOS**, usando **React** e **JavaScript ou TypeScript**.

Ele converte o código React em **componentes nativos do sistema operacional** (como botões, textos, imagens e animações), oferecendo um desempenho próximo ao de um app criado diretamente em Kotlin, Swift ou Java.

---

## ⚛️ Diferença entre React (Web) e React Native (Mobile)

| Característica | React (Web) | React Native (Mobile) |
|----------------|--------------|------------------------|
| Plataforma | Navegador (Web) | Android e iOS |
| Linguagem | JavaScript / TypeScript | JavaScript / TypeScript |
| Renderização | Usa **HTML** e **CSS** | Usa **componentes nativos** do sistema |
| Estilos | Usamos `className` e CSS | Usamos o objeto `StyleSheet` |
| Elementos principais | `<div>`, `<span>`, `<button>` | `<View>`, `<Text>`, `<Button>` |
| Execução | Em um site (navegador) | Em um app (via Expo ou build nativo) |
| Acesso a hardware | Limitado (precisa de APIs externas) | Acesso direto a câmera, GPS, sensores, etc. |

👉 **Resumo:**  
O React Native **não usa HTML nem CSS tradicionais**, mas uma sintaxe muito parecida.  
Ele traduz o código React para **componentes nativos**, garantindo desempenho real de aplicativo.

---

## 💡 Por que usar TypeScript?

O **TypeScript** é uma extensão do JavaScript que adiciona **tipagem estática**.  
Isso ajuda a detectar erros antes da execução e torna o código mais legível e seguro.

### Exemplo:
| JavaScript | TypeScript |
|-------------|-------------|
| `const nome = "Maria";` | `const nome: string = "Maria";` |
| `let idade = 20;` | `let idade: number = 20;` |

---

## ⚙️ O que é o Expo?

O **Expo** é uma ferramenta que simplifica o desenvolvimento com React Native.  
Ele cria toda a estrutura do app, instala dependências e permite testar o aplicativo **diretamente no celular**, **sem precisar de emuladores**.

### O que o Expo faz:
- Cria e organiza o projeto automaticamente  
- Permite testar em tempo real via QR Code  
- Gera versões para Android e iOS  
- Oferece acesso facilitado a câmera, GPS, galeria, áudio, etc.  

---

## 📲 O que é o Expo Go?

O **Expo Go** é um aplicativo gratuito (Android/iOS) que permite **executar seus projetos Expo diretamente no celular**.

- **Android:** [Expo Go na Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)  
- **iOS:** [Expo Go na App Store](https://apps.apple.com/app/expo-go/id982107779)

Depois de criar seu projeto, basta abrir o app **Expo Go**, escanear o **QR Code** gerado e o app rodará no seu celular em segundos.

---

## 📱 Recursos do Celular que o React Native Pode Acessar

O React Native, especialmente com o Expo, permite acessar **recursos nativos do dispositivo**, como:

| Recurso | Exemplo de Uso |
|----------|----------------|
| 📷 **Câmera** | Tirar fotos, gravar vídeos, ler QR Codes |
| 🖼️ **Galeria / Imagens** | Escolher e exibir imagens do celular |
| 📍 **GPS / Localização** | Mapas, rastreamento e geolocalização |
| 🎤 **Microfone** | Gravação e reconhecimento de voz |
| 🔊 **Áudio** | Tocar sons e músicas |
| 📡 **Rede / Internet** | Verificar conexão e chamadas HTTP |
| 🔦 **Lanterna** | Ligar e desligar a lanterna |
| 🔔 **Notificações** | Notificações locais e push |
| 💾 **Armazenamento local** | Salvar dados do usuário no dispositivo |
| 🔑 **Autenticação biométrica** | Login com digital ou Face ID |

Esses recursos são acessados por meio de **APIs e bibliotecas Expo**, como:
```bash
expo-camera
expo-location
expo-notifications
expo-file-system
expo-av
expo-secure-store
````

---

## 🧭 Passo a Passo — Criando o Primeiro Projeto (com TypeScript)

### 1️⃣ Instalar o Node.js

Baixe e instale o **Node.js** em:
👉 [https://nodejs.org](https://nodejs.org)

Marque a opção **“Add to PATH”** durante a instalação.

---

### 2️⃣ Criar o Projeto com o Expo (usando TypeScript)

Abra o terminal e digite:

```bash
npx create-expo-app MeuPrimeiroApp --template blank-typescript
```

Isso cria um projeto com o **TypeScript já configurado**.

---

### 3️⃣ Acessar a pasta do projeto

```bash
cd MeuPrimeiroApp
```

---

### 4️⃣ Iniciar o servidor do Expo

```bash
npx expo start
```

O Expo abrirá uma página no navegador com um **QR Code** e opções de execução.

---

## 🧩 Executando o App

### 🔹 Opção 1 — No Celular (mesma rede Wi-Fi)

1. Instale o **Expo Go** no celular.
2. Certifique-se de que o **celular e o computador estão na mesma rede Wi-Fi**.
3. Escaneie o **QR Code** exibido no navegador.
4. O app será carregado automaticamente no celular.

---

### 🔹 Opção 2 — Usando Tunnel (caso a rede não permita)

Se o Wi-Fi bloquear a conexão, use o **modo Tunnel**:

1. Na página do Expo, clique em **“Connection”**.
2. Escolha **“Tunnel”**.

Isso cria uma conexão segura entre o servidor e o celular, mesmo em redes diferentes.

---

### 🔹 Opção 3 — No Navegador

Também é possível rodar o app no navegador clicando em:

🖥️ **“Run in web browser”**

ou pressionando no terminal:

```bash
w
```

---

## 📁 Estrutura do Projeto

```
MeuPrimeiroApp/
 ├── App.tsx           → Arquivo principal do aplicativo
 ├── tsconfig.json     → Configuração do TypeScript
 ├── package.json      → Dependências e scripts
 ├── node_modules/     → Bibliotecas instaladas
 └── assets/           → Imagens e ícones
```

---

## 🧠 Entendendo o `App.tsx`

Abra o arquivo **App.tsx** e substitua o conteúdo por:

```tsx
import { Text, View, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Olá, React Native com TypeScript! 👋</Text>
      <Text style={styles.subtitle}>Meu primeiro aplicativo mobile 🎉</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    color: '#007AFF',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginTop: 10,
  },
});
```

---

## ⚙️ Atualização em Tempo Real

O Expo faz **atualização automática (Hot Reload)**.
Sempre que você salvar o arquivo, o app recarrega sozinho no celular.

---

## 🧩 Principais Componentes do React Native

| Componente           | Função                                  |
| -------------------- | --------------------------------------- |
| **View**             | Container básico, similar a uma `<div>` |
| **Text**             | Exibe textos                            |
| **Image**            | Mostra imagens                          |
| **Button**           | Cria botões simples                     |
| **ScrollView**       | Permite rolagem de conteúdo             |
| **TextInput**        | Campo de texto para digitação           |
| **TouchableOpacity** | Botão customizável com efeitos de toque |

---

## ✅ Resumo da Aula

Hoje aprendemos:

* O que é **React Native** e como ele difere do **React Web**
* O que é o **Expo** e o **Expo Go**
* Como criar e rodar um app em **TypeScript**
* Que **componentes e sensores do celular** o React Native pode acessar
* Como visualizar o app no **celular**, no **navegador** e via **Tunnel**

---

## 🧠 Desafio

Modifique o app para:

1. Mostrar seu **nome** e **curso**
2. Mudar a **cor de fundo**
3. Acrescentar um **botão** com uma mensagem no `onPress` (clique)

💡 Dica: use o componente `Button` e o evento `onPress`.

Quer que eu gere esse documento como arquivo `.md` pronto para download (por exemplo: `Aula1-Introducao-ReactNative.md`)?
```
