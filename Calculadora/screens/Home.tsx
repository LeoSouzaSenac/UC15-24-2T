import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { FontAwesome5 } from '@expo/vector-icons';

export default function Home() {
  return (
    <View style={styles.container}>
      {/* Ícone de calculadora */}
      <FontAwesome5 name="calculator" size={100} color="#ffd33d" style={styles.logo} />

      <Text style={styles.title}>Calculadora</Text>
      <Text style={styles.subtitle}>Simples, rápida e elegante</Text>

      {/* Mini painel visual */}
      <View style={styles.panel}>
        <Text style={styles.panelText}>0</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    marginBottom: 30,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffd33d',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 40,
  },
  panel: {
    width: '80%',
    height: 100,
    backgroundColor: '#333',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: 20,
  },
  panelText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
});
