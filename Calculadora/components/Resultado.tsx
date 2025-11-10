import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface Props {
  value: number | null;
}

export default function Resultado({ value }: Props) {
  if (value === null) return null; // não mostra nada se não houver resultado

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Resultado: {value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#ffd33d",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#25292e",
  },
});
