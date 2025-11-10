## 🧱 **Estrutura Geral do Projeto**

```
UserProfileApp/
│
├── App.tsx
│
├── /navigation
│   ├── StackNavigator.tsx
│   ├── TabNavigator.tsx
│
├── /screens
│   ├── HomeScreen.tsx
│   ├── EditProfileScreen.tsx
│   ├── SettingsScreen.tsx
│
├── /components
│   ├── UserCard.tsx
│   ├── SettingItem.tsx
│
├── /interfaces
│   ├── UserInterface.ts
│   ├── NavigationTypes.ts
│
├── /styles
│   ├── commonStyles.ts
│
└── /assets
    ├── profile.png
    └── icons/
        ├── home.png
        ├── settings.png
```

---

## 🧭 **Navegação**

### 1. `TabNavigator.tsx`

* Controla as **abas principais** (Bottom Tabs).
* Duas telas:

  * **Home**
  * **Configurações**
* Exibe ícones (por exemplo, `home.png`, `settings.png`).

### 2. `StackNavigator.tsx`

* Envolve o `TabNavigator`.
* Permite empilhar telas.
* Define:

  * **TabNavigator** (como tela inicial)
  * **EditProfileScreen** (chamada a partir da Home)

---

## 🖥️ **Telas (pasta `/screens`)**

### 🏠 `HomeScreen.tsx`

**Objetivo:**
Mostrar as informações básicas do usuário e permitir acessar a tela de edição.

**Elementos esperados:**

* Componente `<UserCard />` com nome, e-mail, cidade e foto.
* Botão “Editar Perfil” → navega para `EditProfileScreen`.

**Fluxo:**
`HomeScreen` → `EditProfileScreen` (ao clicar no botão).

---

### ✏️ `EditProfileScreen.tsx`

**Objetivo:**
Permitir que o usuário edite as informações (nome, e-mail, cidade, etc.)
e retorne os dados atualizados à `HomeScreen`.

**Elementos esperados:**

* Inputs para nome, e-mail e cidade.
* Botão “Salvar alterações”.
* Uso de parâmetros na navegação (`route.params`) para enviar dados atualizados de volta.

---

### ⚙️ `SettingsScreen.tsx`

**Objetivo:**
Exibir opções de conta e preferências do app.

**Elementos esperados:**

* Lista de opções (modo escuro, notificações, sair da conta).
* Cada item pode ser um componente `<SettingItem />`.

**Extras possíveis:**

* Alternar tema claro/escuro (usando Context API).
* Persistir configurações com `AsyncStorage`.

---

## 🧩 **Componentes (pasta `/components`)**

### 🧑‍💼 `UserCard.tsx`

**Função:**
Mostrar as informações resumidas do usuário (foto, nome, e-mail).

**Props esperadas:**

* `user: UserInterface` (objeto tipado com nome, e-mail, cidade e imagem).

---

### ⚙️ `SettingItem.tsx`

**Função:**
Representar um item de configuração (ex: modo escuro, notificações).

**Props esperadas:**

* `title: string`
* `icon?: ImageSourcePropType`
* `onPress?: () => void`

---

## 🧩 **Interfaces (pasta `/interfaces`)**

### `UserInterface.ts`

Define a estrutura de dados do usuário:

```ts
export interface User {
  id: string;
  name: string;
  email: string;
  city: string;
  profileImage?: string;
}
```

### `NavigationTypes.ts`

Define os tipos usados pela navegação (para `Stack` e `Tabs`).

Exemplo de definição:

* `RootStackParamList`
* `RootTabParamList`

Usado com o `useNavigation<NavigationProp<RootStackParamList>>()`.

---

## 🎨 **Estilos Comuns**

### `/styles/commonStyles.ts`

Arquivo centralizado para estilos reutilizáveis.

**Sugestões de estilos:**

* `container` (flex, padding)
* `title` (fontSize, fontWeight)
* `button` e `buttonText`
* `input`
* `card`
* `shadow`

Esse arquivo será importado por todas as telas e componentes para manter a identidade visual consistente.

---

## 🧠 **Fluxo do App**

1. O app inicia no **StackNavigator**, que carrega o **TabNavigator**.
2. O `TabNavigator` mostra duas abas:

   * Home → `HomeScreen`
   * Configurações → `SettingsScreen`
3. A partir da `HomeScreen`, o usuário pode abrir a tela `EditProfileScreen`.
4. Após editar, os dados voltam atualizados à `HomeScreen`.
