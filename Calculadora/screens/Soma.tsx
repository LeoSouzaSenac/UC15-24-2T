import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import ResultadoModal from "../components/ResultadoModal";
import { commonStyles as styles } from "../styles/commonStyles";

export default function Soma() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [resultado, setResultado] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Função que retorna o número
  const soma = (): number => {
    const res = Number(num1) + Number(num2);
    setResultado(res);       // atualiza o estado
    setModalVisible(true);   // abre modal
    return res;              // retorna o valor
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Soma</Text>

      <View style={styles.inputsContainer}>
        <Input
          label="Número 1"
          value={num1}
          onChangeText={setNum1}
          placeholder="Digite o primeiro número"
        />
        <Input
          label="Número 2"
          value={num2}
          onChangeText={setNum2}
          placeholder="Digite o segundo número"
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button label="Somar" iconName="plus" onPress={soma} />
      </View>

      <ResultadoModal
        value={resultado}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
}

