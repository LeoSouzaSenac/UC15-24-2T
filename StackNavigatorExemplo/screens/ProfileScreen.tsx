import { Button, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ProfileScreenProps } from '../interfaces/NavigationInterfaces';

// route é um objeto que representa a tela atual
// route.name → nome da aba atual (Home, Profile, etc)
// route.key → chave única gerada para a tela
// route.params → parâmetros passados (se houver)

export default function ProfileScreen({ navigation, route }: ProfileScreenProps) {
    const { userId } = route.params; 
    
    return (
        <View style={styles.container}>
           
                <Text style={styles.text}>ProfileScreen do Usuario de ID: {userId}</Text>
           
            <Button
                title="Voltar para Home"
                onPress={() => navigation.goBack()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
    },
    text:{
        color:"red",
        fontSize:18,
        fontWeight:"bold",
    }
});
