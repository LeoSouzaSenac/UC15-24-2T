import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { ParamListBase } from "@react-navigation/native";


export interface BottomTabsParamList extends ParamListBase {
    Home:undefined;
    Soma:undefined;
    Sub:undefined;
    Mult:undefined;
    Div:undefined;
}

// Props HomeScreen
export interface BottomTabScreenProps {
    navigation: BottomTabNavigationProp<BottomTabsParamList>;
  }

