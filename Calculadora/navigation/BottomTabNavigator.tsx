import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomTabsParamList } from "../interfaces/types";
import { FontAwesome5 } from '@expo/vector-icons';
import Home from "../screens/Home";
import Soma from "../screens/Soma";
import Sub from "../screens/Sub";
import Div from "../screens/Div";
import Mult from "../screens/Mult";

const Tab = createBottomTabNavigator<BottomTabsParamList>();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName:any;
          if (route.name === "Home") iconName = "home";
          if (route.name === "Soma") iconName = "plus";
          if (route.name === "Sub") iconName = "minus";
          if (route.name === "Div") iconName = "divide";
          if (route.name === "Mult") iconName = "times";
          return <FontAwesome5 name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: "gold",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: { height: 60 },
        tabBarLabelStyle: { fontSize: 14 },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Soma" component={Soma} />
      <Tab.Screen name="Sub" component={Sub} />
      <Tab.Screen name="Div" component={Div} />
      <Tab.Screen name="Mult" component={Mult} />
    </Tab.Navigator>
  );
}
