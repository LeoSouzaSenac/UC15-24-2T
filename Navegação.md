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

## Tab.Navigator
Cria o Bottom Tabs Navigator (barra de abas na parte inferior).
Contém todas as telas (Tab.Screen) que aparecerão como abas.

## screenOptions={({ route }) => ({ ... })}
Permite configurar opções dinâmicas por tela.
Serve para configurar opções de todas as telas/abas de um navegador de uma só vez.
Exemplo de opções comuns:
Cor da aba (tabBarActiveTintColor)
Estilo do label (tabBarLabelStyle)
Ícone da aba (tabBarIcon)
Estamos usando uma função que recebe como argumento um objeto contendo informações da tela atual
Este objeto (route) contém:
route.name → nome da aba atual (Home, Profile, etc)
route.key → chave única gerada para a tela
route.params → parâmetros passados (se houver)
Retorna um objeto de opções que será aplicado a todas as abas.

## tabBarIcon: ({ color, size }) => { ... }
Define o ícone exibido em cada aba.
Recebe color e size automaticamente do React Navigation.
route.name indica qual aba está sendo renderizada, permitindo definir ícones diferentes por tela.


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
O React Navigation passa automaticamente um objeto chamado navigation para todas as telas registradas no Navigator.
Na prática, toda tela que você define em:
```tsx
<Stack.Screen name="Home" component={HomeScreen} />
```
recebe automaticamente um objeto de props que contém pelo menos:
```tsx
{
  navigation: NavigationProp;
  route: RouteProp;
}

```

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


## 1️⃣ `navigate('Profile')`

* **O que faz:** vai para a tela indicada.
* **Comportamento:**

  * Se a tela já estiver na pilha, ele **não cria uma nova instância**, apenas vai até ela.
  * Se a tela não estiver na pilha, ele **cria uma nova instância**.
* **Exemplo:**

```tsx
navigation.navigate('Profile'); // Vai para a tela Profile
```

* **Quando usar:**

  * Fluxos normais de navegação, como ir de **Home → Profile** ou **Lista → Detalhes**.

---

## 2️⃣ `push('Profile')`

* **O que faz:** abre **uma nova instância da mesma tela**, mesmo que ela já exista na pilha.
* **Exemplo:**

```tsx
navigation.push('Profile'); // Abre outro Profile em cima da pilha
```

* **Quando usar:**

  * Quando você quer **duplicar a tela** na pilha, por exemplo:

    * Ver detalhes de produtos diferentes na mesma tela.
    * Navegação recursiva (Profile de outro usuário).

* **Diferença para `navigate`:**

  * `navigate` vai para a tela existente se ela já estiver na pilha.
  * `push` sempre cria uma nova instância.

---

## 3️⃣ `goBack()`

* **O que faz:** volta para a tela anterior na pilha.
* **Exemplo:**

```tsx
navigation.goBack(); // Volta para a tela anterior
```

* **Quando usar:**

  * Botões de “voltar” ou swipe gestures.
  * Sempre remove a tela do topo da pilha.

* **Nota:**

  * Se não houver tela anterior, nada acontece.
  * Em algumas situações, pode ser necessário verificar `canGoBack()`:

```tsx
if (navigation.canGoBack()) {
  navigation.goBack();
}
```

---

## 4️⃣ `replace('Profile')`

* **O que faz:** substitui **a tela atual** por outra, sem manter a tela antiga na pilha.
* **Exemplo:**

```tsx
navigation.replace('Profile'); // Substitui a tela atual
```

* **Quando usar:**

  * Fluxos de login ou onboarding:

    * Depois de fazer login, substituir LoginScreen por HomeScreen.
    * O usuário não poderá voltar para a tela de login usando o botão “voltar”.

---

## 5️⃣ `setParams({ key: value })`

* **O que faz:** atualiza os **parâmetros da tela atual**.
* **Exemplo:**

```tsx
navigation.setParams({ theme: 'dark' });
```

* **Quando usar:**

  * Alterar dinamicamente informações da tela **sem navegar para outra**.
  * Útil em filtros, modos de exibição, tema, ou status que depende da mesma tela.

* **Como acessar:**

```tsx
function ProfileScreen({ route }) {
  const { theme } = route.params || {}; // pega o valor atualizado
}
```

---

### ✅ Resumo visual

| Função             | O que faz                                            | Quando usar                                    |
| ------------------ | ---------------------------------------------------- | ---------------------------------------------- |
| `navigate('Tela')` | Vai para a tela indicada (não duplica se já existir) | Fluxos normais                                 |
| `push('Tela')`     | Cria uma nova instância da tela                      | Detalhes de itens, recursão                    |
| `goBack()`         | Volta para a tela anterior                           | Botões ou gestos de voltar                     |
| `replace('Tela')`  | Substitui a tela atual                               | Login, onboarding, substituição de tela        |
| `setParams({})`    | Atualiza parâmetros da tela atual                    | Alterações dinâmicas de dados sem sair da tela |


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
// É uma interface que define todas as rotas (telas) da sua pilha de navegação.
// Cada propriedade da interface é o nome de uma tela, exatamente como você registrou no Stack.Navigator
// O valor de cada propriedade (undefined para a Home ou userId para o profile) indica quais parâmetros a tela recebe

interface StackParamList extends ParamListBase{
  Home: undefined;
  Profile: { userId: number } | undefined;
}

// Interface dos props da HomeScreen
// Define os props que a tela HomeScreen recebe.
// Neste caso, a tela HomeScreen recebe apenas o navigation, que permite controlar a navegação dentro do app.

// NativeStackNavigationProp: tipo do objeto navigation do React Navigation para Stack Navigator
// <StackParamList, 'Home'> StackParamList: todas as rotas da pilha. 'Home': qual tela estamos tipando especificamente.
// Ou seja, o TypeScript vai saber que:
// Podemos navegar para qualquer tela definida em StackParamList.
// Se a tela aceita parâmetros, o TypeScript vai exigir que sejam passados corretamente.

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

* `StackParamList` :define todas as rotas e parâmetros.
* `HomeScreenProps` :garante que `navigation.navigate` só aceita telas e parâmetros válidos.
* `navigation.navigate('Profile', { userId: 1 })`: TypeScript valida os tipos.

---

## **11️⃣ Dicas finais**

* Organize suas telas em uma pasta `screens`.
* Use Nested Navigators para apps complexos (Stack + Tabs + Drawer).
* Ícones deixam a navegação mais intuitiva (`@expo/vector-icons`).
* Sempre teste em dispositivos reais ou simuladores.
* Use `route.params?.paramName` para evitar erros se nenhum parâmetro for enviado.
* Prefira tipagem com **interface** para segurança e manutenção do código.

