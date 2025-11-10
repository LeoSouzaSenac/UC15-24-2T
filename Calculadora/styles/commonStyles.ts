import { StyleSheet } from "react-native";

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 30,
  },
  inputsContainer: {
    width: "100%",
    marginBottom: 30,
    alignItems: "center",
    justifyContent: "space-between",
    gap: 20,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
});
