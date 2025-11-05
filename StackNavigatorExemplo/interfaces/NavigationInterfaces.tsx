import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp, ParamListBase } from '@react-navigation/native';

// Interface das rotas da pilha
// Interface das rotas
// É uma interface que define todas as rotas (telas) da sua pilha de navegação.
// Cada propriedade da interface é o nome de uma tela, exatamente como você registrou no Stack.Navigator
// O valor de cada propriedade (undefined para a Home ou userId para o profile) indica quais parâmetros a tela recebe
export interface StackParamList extends ParamListBase {
  Home: undefined;
  Profile: { userId: number };
  About: undefined;
}

// Props HomeScreen
export interface HomeScreenProps {
    navigation: NativeStackNavigationProp<StackParamList, 'Home'>;
  }

// Props ProfileScreen
export interface ProfileScreenProps {
    navigation: NativeStackNavigationProp<StackParamList, 'Profile'>;
    route: RouteProp<StackParamList, 'Profile'>;
  }


