import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";

export default function SecondaryButton({ option, onPress, isCorrect, isSelected }) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.choiceButton,
        isCorrect && styles.correctChoiceButton,
        isSelected && !isCorrect && styles.wrongChoiceButton,
      ]}
    >
      <Text style={isCorrect ? styles.correctChoiceText : isSelected ? styles.wrongChoiceText : styles.choice}>
        {option}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  choiceButton: {
    borderColor: "#c7c7c7",
    borderWidth: 2,
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  choice: {
    color: "black",
    textAlign: "center",
  },
  correctChoiceButton: {
    borderColor: "#299900",
    borderWidth: 2,
  },
  correctChoiceText: {
    color: "#299900",
    textAlign: "center",
  },
  wrongChoiceButton: {
    borderColor: "#b00015",
    borderWidth: 2,
  },
  wrongChoiceText: {
    color: "#b00015",
    textAlign: "center",
  },
});
