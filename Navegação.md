# 📱 Navegação entre Telas no React Native

Neste guia, você vai aprender **todas as formas de navegar entre telas** em React Native usando **React Navigation**. Vamos mostrar o passo a passo, como instalar, e exemplos comentados linha por linha.

---

## **1️⃣ Instalando o React Navigation**

Primeiro, instale o pacote principal:

```bash
npm install @react-navigation/native
```

Depois, instale as dependências necessárias:

```bash
npm install react-native-screens react-native-safe-area-context
```

Se estiver usando **Expo**, execute:

```bash
expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-masked-view/masked-view
```

---

## **2️⃣ Stack Navigator (Pilha de Telas)**

* Navegação linear: abrir uma tela e depois voltar.
* Ideal para fluxos tipo “Home → Detalhes → Perfil”.

```tsx
// Importa o React
import * as React from 'react';
// NavigationContainer é o container que envolve toda a navegação
import { NavigationContainer } from '@react-navigation/native';
// Cria a stack (pilha) de telas
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Importa as telas do app
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';

// Cria a stack navigator
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // Envolve toda a navegação do app
    <NavigationContainer>
      {/* Stack.Navigator define a pilha de telas */}
      <Stack.Navigator initialRouteName="Home">
        {/* Cada Stack.Screen representa uma tela da pilha */}
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

**Explicação das principais partes:**

* `NavigationContainer` → Container principal de navegação, obrigatório.
* `Stack.Navigator` → Gerencia a pilha de telas.
* `Stack.Screen` → Define cada tela com um nome (`name`) e o componente que será renderizado (`component`).
* `initialRouteName` → Define a tela inicial da pilha.

---

## **3️⃣ Bottom Tabs Navigator (Abas Inferiores)**

* Barra de abas no rodapé.
* Cada aba representa uma seção principal do app.

```tsx
// Importa React
import * as React from 'react';
// Container principal
import { NavigationContainer } from '@react-navigation/native';
// Cria o Bottom Tabs
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// Importa telas
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
// Biblioteca de ícones
import { Ionicons } from '@expo/vector-icons';

// Cria o Tab Navigator
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* Tab.Navigator cria o menu de abas */}
      <Tab.Navigator
        // screenOptions permite personalizar cada aba
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            // Define ícones de acordo com o nome da rota
            if (route.name === 'Home') iconName = 'home-outline';
            if (route.name === 'Profile') iconName = 'person-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        {/* Cada Tab.Screen representa uma aba */}
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
```

**Explicação das principais partes:**

* `screenOptions` → Personaliza cada aba, como ícones ou cores.
* `route.name` → Identifica a aba atual.
* `Ionicons` → Ícones para deixar a navegação visual e intuitiva.

---

## **4️⃣ Drawer Navigator (Menu Lateral)**

* Menu lateral que desliza da esquerda.
* Ideal para apps com muitas seções.

```tsx
// Importa React
import * as React from 'react';
// Container principal
import { NavigationContainer } from '@react-navigation/native';
// Cria o Drawer Navigator
import { createDrawerNavigator } from '@react-navigation/drawer';
// Importa telas
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';

// Cria o Drawer Navigator
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* Drawer.Navigator cria o menu lateral */}
      <Drawer.Navigator>
        {/* Cada Drawer.Screen representa um item do menu */}
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Profile" component={ProfileScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
```

---

## **5️⃣ Material Top Tabs (Abas no Topo)**

* Barra de abas no topo da tela, ideal para seções que deslizam horizontalmente.

```tsx
// Importa React
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
// Material Top Tabs
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// Importa telas
import FeedScreen from './screens/FeedScreen';
import MessagesScreen from './screens/MessagesScreen';

// Cria Top Tabs
const TopTab = createMaterialTopTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <TopTab.Navigator>
        {/* Cada TopTab.Screen representa uma aba no topo */}
        <TopTab.Screen name="Feed" component={FeedScreen} />
        <TopTab.Screen name="Messages" component={MessagesScreen} />
      </TopTab.Navigator>
    </NavigationContainer>
  );
}
```

---

## **6️⃣ Nested Navigators (Navegação Aninhada)**

* Combina diferentes tipos de navegação.
* Ex.: Stack dentro de Tab, ou Drawer com Stack.

```tsx
// Exemplo: Stack dentro de Bottom Tabs
<Tab.Navigator>
  <Tab.Screen name="HomeStack" component={HomeStack} />
  <Tab.Screen name="Profile" component={ProfileScreen} />
</Tab.Navigator>
```

**Explicação:** Permite criar apps mais complexos, combinando menus, abas e pilhas.

---

## **7️⃣ Principais Funções de Navegação**

| Função                               | O que faz                          |
| ------------------------------------ | ---------------------------------- |
| `navigation.navigate('Profile')`     | Vai para a tela indicada           |
| `navigation.push('Profile')`         | Abre outra instância da mesma tela |
| `navigation.goBack()`                | Volta para a tela anterior         |
| `navigation.replace('Profile')`      | Substitui a tela atual             |
| `navigation.setParams({key: value})` | Atualiza parâmetros da tela atual  |

---

## **💡 Dicas Finais**

* Organize suas telas em uma pasta `screens`.
* Passe parâmetros entre telas usando `navigation.navigate('Screen', { param: value })`.
* Use ícones com `react-native-vector-icons` ou `@expo/vector-icons` para deixar a navegação visual.
* Combine navegadores para criar apps completos: **Stack + Tabs + Drawer**.

Quer que eu faça essa versão colorida e visual?
