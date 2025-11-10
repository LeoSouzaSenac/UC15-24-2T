import React from "react";
import { Modal, View, Text, StyleSheet, Pressable } from "react-native";

interface Props {
  value: number | null;
  visible: boolean;
  onClose: () => void;
}

export default function ResultadoModal({ value, visible, onClose }: Props) {
  if (value === null) return null;

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.text}>
          {value === null ? "Erro: divisão por 0" : `Resultado: ${value}`}
          </Text>
          <Pressable onPress={onClose} style={styles.button}>
            <Text style={styles.buttonText}>Fechar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: "#ffd33d",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
  },
  text: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#25292e",
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#25292e",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: "#ffd33d",
    fontWeight: "bold",
    fontSize: 16,
  },
});
