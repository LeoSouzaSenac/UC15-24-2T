# 📱 Navegação em React Native: Guia Completo e Didático (Atualizado)

A **navegação entre telas** é essencial para apps móveis. O **React Navigation** permite criar **pilhas de telas**, **abas**, **menus laterais** e combinações entre eles.

Você vai aprender:

* Tipos de navegação (Stack, Tabs, Drawer, Top Tabs, Nested).
* Como instalar e configurar.
* Como usar `navigation` e `route`.
* Exemplos de telas com **TypeScript**, usando **interfaces**.
* Boas práticas e dicas.

---

## **1️⃣ Instalando o React Navigation**

1. Pacote principal:

```bash
npm install @react-navigation/native
```

2. Dependências essenciais:

```bash
npm install react-native-screens react-native-safe-area-context @react-navigation/native-stack
```

3. Se usar **Expo**:

```bash
npx expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-masked-view/masked-view
```

> ⚠️ É importante instalar essas dependências para que a navegação funcione corretamente, especialmente para gestos e animações suaves.

---

## **2️⃣ Stack Navigator (Pilha de telas)**

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

* `NavigationContainer` → container principal de navegação.
* `Stack.Navigator` → gerencia a pilha de telas.
* `Stack.Screen` → define cada tela (`name` e `component`).
* `initialRouteName` → primeira tela exibida.

---

## **3️⃣ Bottom Tabs Navigator (Abas Inferiores)**

```tsx
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';

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

**Dicas:**

* `tabBarIcon` → define ícones por aba.
* `route.name` → nome da aba atual.

---

## **4️⃣ Drawer Navigator (Menu lateral)**

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

---

## **5️⃣ Material Top Tabs (Abas no topo)**

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

---

## **6️⃣ Nested Navigators**

Exemplo: Stack dentro de Bottom Tabs

```tsx
<Tab.Navigator>
  <Tab.Screen name="HomeStack" component={HomeStack} />
  <Tab.Screen name="Profile" component={ProfileScreen} />
</Tab.Navigator>
```

> Permite ter abas que contêm várias telas em pilha.

---

## **7️⃣ O que é `navigation` e `route`**

* `navigation` → objeto que controla a navegação (`navigate`, `goBack`, `push`, `replace`).
* `route` → objeto que representa a tela atual, contendo `params` e `name`.

Exemplo de navegação com parâmetros:

```tsx
navigation.navigate('Profile', { userId: 42 });
```

Na tela destino:

```tsx
function ProfileScreen({ route }) {
  const { userId } = route.params || {};
}
```

---

## **8️⃣ Funções essenciais do navigation**

| Função                   | Descrição                         |
| ------------------------ | --------------------------------- |
| `navigate('Profile')`    | Vai para a tela indicada          |
| `push('Profile')`        | Abre nova instância da mesma tela |
| `goBack()`               | Volta para a tela anterior        |
| `replace('Profile')`     | Substitui a tela atual            |
| `setParams({key:value})` | Atualiza parâmetros da tela atual |

---

## **9️⃣ Exemplo de HomeScreen com `any`**

```tsx
import { Button, StyleSheet, Text, View } from 'react-native';
import React from 'react';

export default function HomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>HomeScreen</Text>
      <Button
        title="Ir para Profile"
        onPress={() => navigation.navigate('Profile')} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
      flex:1,
      justifyContent:"center",
      alignItems: "center",
  }, 
  text:{
      color:"blue",
      fontSize:18,
      fontWeight:"bold",
  }
})
```

✅ Observação: `any` desativa checagem de tipos, útil para iniciantes ou testes rápidos.

---

## **10️⃣ Exemplo de HomeScreen com `interface`**

```tsx
import { Button, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Interface das rotas
interface StackParamList {
  Home: undefined;
  Profile: { userId: number } | undefined;
}

// Interface dos props da HomeScreen
interface HomeScreenProps {
  navigation: NativeStackNavigationProp<StackParamList, 'Home'>;
}

export default function HomeScreen({ navigation }: HomeScreenProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>HomeScreen</Text>
      <Button
        title="Ir para Profile"
        onPress={() => navigation.navigate('Profile', { userId: 1 })} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
      flex:1,
      justifyContent:"center",
      alignItems: "center",
  }, 
  text:{
      color:"blue",
      fontSize:18,
      fontWeight:"bold",
  }
});
```

✅ Explicação:

* `StackParamList` → define todas as rotas e parâmetros.
* `HomeScreenProps` → garante que `navigation.navigate` só aceita telas e parâmetros válidos.
* `navigation.navigate('Profile', { userId: 1 })` → TypeScript valida os tipos.

---

## **11️⃣ Dicas finais**

* Organize suas telas em uma pasta `screens`.
* Use Nested Navigators para apps complexos (Stack + Tabs + Drawer).
* Ícones deixam a navegação mais intuitiva (`@expo/vector-icons`).
* Sempre teste em dispositivos reais ou simuladores.
* Use `route.params?.paramName` para evitar erros se nenhum parâmetro for enviado.
* Prefira tipagem com **interface** para segurança e manutenção do código.

