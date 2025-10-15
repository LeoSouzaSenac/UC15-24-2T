# Exemplo de App React Native com Formulário e Imagem

Este é um exemplo simples de aplicativo React Native que inclui:

- Cabeçalho
- Imagem central
- Formulário com campos de nome e email
- Botão de envio
- Rodapé

---

```javascript
import React from 'react';
// Importa os componentes básicos do React Native
import { 
  View,        // Contêiner de layout
  Text,        // Para exibir textos
  TextInput,   // Campo de input de texto
  Button,      // Botão clicável
  Image,       // Exibe imagens
  StyleSheet,  // Para criar estilos
  ScrollView   // Container que permite rolagem de conteúdo
} from 'react-native';

// Componente principal do App
export default function App() {
  return (
    // ScrollView permite rolar a tela caso o conteúdo seja maior que a tela
    <ScrollView contentContainerStyle={styles.container}>
      
      {/* Cabeçalho */}
      <Text style={styles.header}>
        Bem-vindo ao Meu App
      </Text>
      
      {/* Imagem central */}
      <Image
        source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
        style={styles.image}
      />

      {/* Formulário simples */}
      <View style={styles.form}>
        <Text style={styles.label}>Nome</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Digite seu nome" 
        />

        <Text style={styles.label}>Email</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Digite seu email" 
          keyboardType="email-address"
        />

        <View style={styles.buttonContainer}>
          <Button 
            title="Enviar" 
            onPress={() => alert('Formulário enviado!')} 
            color="#4A90E2"
          />
        </View>
      </View>

      {/* Rodapé */}
      <Text style={styles.footer}>
        © 2025 Meu App. Todos os direitos reservados.
      </Text>
    </ScrollView>
  );
}

// Estilos da aplicação
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#333',
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 30,
  },
  form: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 10,
  },
  footer: {
    marginTop: 40,
    color: '#888',
  },
});
````


