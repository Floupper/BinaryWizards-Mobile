import { StyleSheet } from "react-native";

export const styleButton = StyleSheet.create({
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#3552b0",
    padding: 10,
    margin: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  choiceButton: {
    borderColor: "#c7c7c7",
    borderWidth: 2,
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  correctChoiceButton: {
    borderColor: "#299900",
    borderWidth: 2,
  },
  wrongChoiceButton: {
    borderColor: "#b00015",
    borderWidth: 2,
  },
});
