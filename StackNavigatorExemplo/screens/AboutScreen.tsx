import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function AboutScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>AboutScreen</Text>
      <Button
        title="Voltar para Home"
        onPress={() => navigation.goBack()}
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
        color:"red",
        fontSize:18,
        fontWeight:"bold",
    }
})