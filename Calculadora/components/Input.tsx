import React from "react";
import { StyleSheet, TextInput, View, Text } from "react-native";

interface InputProps {
  label?: string; // texto acima do input
  value: string; // valor atual
  placeholder?: string; // dica dentro do input
  onChangeText: (text: string) => void; // função chamada quando o valor muda
}

export default function Input({ label, value, placeholder, onChangeText }: InputProps) {
  // Filtra para permitir apenas números
  const handleChange = (text: string) => {
    const onlyNums = text.replace(/[^0-9.-]/g, "");
    onChangeText(onlyNums);
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <TextInput
        style={styles.input}
        value={value}
        placeholder={placeholder}
        onChangeText={handleChange}
        keyboardType="numeric" // abre teclado numérico
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "90%"
   
  },
  label: {
    color: "#333",
    fontSize: 16,
    marginBottom: 6,
  },
  input: {
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    fontSize: 18,
    backgroundColor: "#fff",
  },
});
