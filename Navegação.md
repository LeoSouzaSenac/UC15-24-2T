# 📱 Navegação em React Native: Guia Completo e Didático

A **navegação entre telas** é um dos conceitos mais importantes no desenvolvimento de aplicativos móveis. Em React Native, a biblioteca mais utilizada para isso é o **React Navigation**, que permite criar **pilhas de telas**, **abas**, **menus laterais** e combinações entre eles, de forma prática e intuitiva.

Neste guia, você vai aprender:

* O que é navegação e como ela funciona em apps móveis.
* Todos os tipos de navegadores do React Navigation.
* Como instalar e configurar corretamente.
* Como usar **`route`** e **parâmetros de tela**.
* Exemplos práticos comentados linha a linha.

---

## **1️⃣ O que é navegação em React Native**

Quando falamos em **navegação**, estamos falando sobre como o usuário se desloca de uma tela para outra dentro do aplicativo. Por exemplo:

* Home → Perfil → Configurações
* Lista de produtos → Detalhes do produto → Carrinho

Existem vários padrões de navegação:

* **Stack Navigator** → Pilha de telas (como páginas de um livro).
* **Bottom Tabs Navigator** → Menu de abas na parte inferior da tela.
* **Drawer Navigator** → Menu lateral que desliza da esquerda.
* **Material Top Tabs** → Abas no topo da tela, deslizando horizontalmente.
* **Nested Navigators** → Combinação de navegadores para apps complexos.

---

## **2️⃣ Instalando o React Navigation**

Antes de usar qualquer tipo de navegação, precisamos instalar o React Navigation e suas dependências.

1. Pacote principal do React Navigation:

```bash
npm install @react-navigation/native
```

2. Dependências essenciais:

```bash
npm install react-native-screens react-native-safe-area-context
```

3. Se estiver usando **Expo**, instale também:

```bash
expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-masked-view/masked-view
```

> ⚠️ É importante instalar essas dependências para que a navegação funcione corretamente, especialmente para gestos e animações suaves.

---

## **3️⃣ Stack Navigator (Pilha de Telas)**

O **Stack Navigator** é o tipo de navegação mais comum. Ele funciona como uma pilha:

* Você empilha uma tela por cima da outra.
* Ao voltar, remove a tela do topo da pilha.
* Ideal para fluxos lineares, como “Home → Detalhes → Perfil”.

```tsx
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

**Explicação:**

* `NavigationContainer` → Container principal de navegação (obrigatório).
* `Stack.Navigator` → Gerencia a pilha de telas.
* `Stack.Screen` → Define cada tela da pilha com `name` e `component`.
* `initialRouteName` → Tela que será aberta primeiro.

---

## **4️⃣ Bottom Tabs Navigator (Abas Inferiores)**

O **Bottom Tabs** cria uma barra de navegação na parte inferior do app. Cada aba representa uma seção principal do aplicativo.

```tsx
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Home') iconName = 'home-outline';
            if (route.name === 'Profile') iconName = 'person-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
```

**Dicas importantes:**

* `tabBarIcon` → Permite definir ícones para cada aba.
* `route.name` → Nome da aba atual.
* Pode personalizar cores, estilos e labels usando `screenOptions`.

---

## **5️⃣ Drawer Navigator (Menu Lateral)**

O **Drawer Navigator** cria um menu lateral deslizante, muito útil para apps com muitas seções ou opções.

```tsx
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Profile" component={ProfileScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
```

**Observação:**
O Drawer é excelente quando você tem muitas telas e precisa de acesso rápido sem ocupar espaço na tela principal.

---

## **6️⃣ Material Top Tabs (Abas no Topo)**

As **Top Tabs** ficam no topo da tela e geralmente permitem navegação horizontal deslizando entre telas.

```tsx
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import FeedScreen from './screens/FeedScreen';
import MessagesScreen from './screens/MessagesScreen';

const TopTab = createMaterialTopTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <TopTab.Navigator>
        <TopTab.Screen name="Feed" component={FeedScreen} />
        <TopTab.Screen name="Messages" component={MessagesScreen} />
      </TopTab.Navigator>
    </NavigationContainer>
  );
}
```

> Esse tipo de navegação é muito usado em redes sociais ou apps de chat, onde a troca rápida de seções é importante.

---

## **7️⃣ Nested Navigators (Navegação Aninhada)**

Às vezes, um tipo de navegação não é suficiente. O **Nested Navigator** permite combinar diferentes navegadores.

Exemplo: Stack dentro de Bottom Tabs:

```tsx
<Tab.Navigator>
  <Tab.Screen name="HomeStack" component={HomeStack} />
  <Tab.Screen name="Profile" component={ProfileScreen} />
</Tab.Navigator>
```

> Com isso, você pode ter uma aba que contém várias telas em pilha (Stack), enquanto outra aba leva direto a uma tela única.

---

## **8️⃣ O que é `route` e como usar**

O **`route`** é um **objeto que representa a tela atual** no React Navigation. Ele contém informações sobre a tela, especialmente os **parâmetros passados** de outra tela.

```tsx
function ProfileScreen({ route, navigation }) {
  // 'route.params' contém todos os parâmetros enviados
  const { userId, theme } = route.params || {};

  return (
    <Text>Usuário: {userId}, Tema: {theme}</Text>
  );
}
```

### 🔹 Estrutura do `route`

| Propriedade               | Tipo     | Descrição                                      |
| ------------------------- | -------- | ---------------------------------------------- |
| `route.key`               | string   | Identificador único da tela (útil para pilhas) |
| `route.name`              | string   | Nome da tela registrada no Navigator           |
| `route.params`            | object   | Parâmetros passados para a tela                |
| `route.params?.paramName` | qualquer | Valor de um parâmetro específico               |

### 🔹 Como passar parâmetros

```tsx
navigation.navigate('Profile', { userId: 42, theme: 'dark' });
```

Na tela de destino:

```tsx
const { userId, theme } = route.params || {};
```

### 🔹 Boas práticas com `route`

* Sempre use `route.params?.paramName` para evitar erros se nenhum parâmetro for enviado.
* Evite modificar `route.params` diretamente. Use `navigation.setParams` para atualizar parâmetros.
* Use `route.name` ou `route.key` para lógica condicional ou logs.

---

## **9️⃣ Funções de Navegação Essenciais**

| Função                               | O que faz                          |
| ------------------------------------ | ---------------------------------- |
| `navigation.navigate('Profile')`     | Vai para a tela indicada           |
| `navigation.push('Profile')`         | Abre outra instância da mesma tela |
| `navigation.goBack()`                | Volta para a tela anterior         |
| `navigation.replace('Profile')`      | Substitui a tela atual             |
| `navigation.setParams({key: value})` | Atualiza parâmetros da tela atual  |

---

## **💡 Dicas Finais para Navegação**

* Organize suas telas em uma pasta chamada `screens`.
* Use **Nested Navigators** para apps complexos: Stack + Tabs + Drawer.
* Ícones deixam a navegação mais intuitiva (`@expo/vector-icons` ou `react-native-vector-icons`).
* Sempre teste a navegação em dispositivos reais ou simuladores para verificar gestos, animações e transições.
* Passe parâmetros entre telas de forma clara e consistente para evitar bugs.
