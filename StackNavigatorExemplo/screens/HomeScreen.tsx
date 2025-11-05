import { Button, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { HomeScreenProps } from '../interfaces/NavigationInterfaces';

// Interface dos props da HomeScreen
// Define os props que a tela HomeScreen recebe.
// Neste caso, a tela HomeScreen recebe apenas o navigation, que permite controlar a navegação dentro do app.

// NativeStackNavigationProp: tipo do objeto navigation do React Navigation para Stack Navigator
// <StackParamList, 'Home'> StackParamList: todas as rotas da pilha. 'Home': qual tela estamos tipando especificamente.
// Ou seja, o TypeScript vai saber que:
// Podemos navegar para qualquer tela definida em StackParamList.
// Se a tela aceita parâmetros, o TypeScript vai exigir que sejam passados corretamente.

export default function HomeScreen({ navigation }: HomeScreenProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>HomeScreen</Text>
      <Button
        title="Ir para Profile"
        onPress={() => navigation.navigate('Profile', { userId: 1 })} 
      />
      <Button
        title="Ir para About"
        onPress={() => navigation.navigate('About')} 
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
