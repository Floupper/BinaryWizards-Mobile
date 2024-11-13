import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import SecondaryButton from "./SecondaryButton"; // Chemin à ajuster selon votre projet
import { styleContainer } from "../styles/container";

export default function QuestionComponent({ question, selectedAnswer, correctAnswer }) {
  const [userAnswerIndex, setUserAnswerIndex] = useState(null);

  useEffect(() => {
    setUserAnswerIndex(null);
  }, [question]);

  const sendUserAnswer = (index) => {
    if (userAnswerIndex === null) {
      setUserAnswerIndex(index);
      selectedAnswer(index);
    }
  };

  return (
    <View>
      <Text style={styleContainer.questionTitleContainer}>{question.question_text}</Text>
      {question.options && Array.isArray(question.options) ? (
        question.options.map((option, index) => (
          <SecondaryButton
            key={index}
            option={option}
            onPress={() => sendUserAnswer(index)}
            isCorrect={index === correctAnswer?.correct_option_index}
            isSelected={userAnswerIndex !== null && index === userAnswerIndex && correctAnswer?.correct_option_index !== userAnswerIndex}
          />
        ))
      ) : (
        <Text>No question available</Text>
      )}
    </View>
  );
}
