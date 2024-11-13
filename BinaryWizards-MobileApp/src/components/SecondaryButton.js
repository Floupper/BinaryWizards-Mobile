import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { styleButton } from "../styles/buttons";
import { styleText } from "../styles/text";

export default function SecondaryButton({ option, onPress, isCorrect, isSelected }) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styleButton.choiceButton,
        isCorrect && styleButton.correctChoiceButton,
        isSelected && !isCorrect && styleButton.wrongChoiceButton,
      ]}
    >
      <Text style={isCorrect ? styleText.correctChoiceText : isSelected ? styleText.wrongChoiceText : styleText.choice}>
        {option}
      </Text>
    </Pressable>
  );
}