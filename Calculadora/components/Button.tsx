import { StyleSheet, View, Pressable, Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

interface Props {
  label: string;
  iconName:any;
  onPress: () => number;

};

export default function Button({ label,iconName, onPress}: Props) {
  
    return (
      <View
        style={[
          styles.buttonContainer,
          { borderWidth: 4, borderColor: 'white', borderRadius: 18 },
        ]}>
        <Pressable
          style={[styles.button, { backgroundColor: 'gold' }]}
          onPress={() => onPress()}>
          <FontAwesome5 name={iconName} size={18} color="#25292e" style={styles.buttonIcon} />
          <Text style={[styles.buttonLabel, { color: '#25292e' }]}>{label}</Text>
        </Pressable>
      </View>
    );
  
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: "90%",            // combina com os inputs
    height: 60,              // altura proporcional
    marginVertical: 10,      // espaçamento homogêneo
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    borderRadius: 10,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  buttonIcon: {
    paddingRight: 8,
  },
  buttonLabel: {
    fontSize: 16,
    color: "#25292e",
  },
});

