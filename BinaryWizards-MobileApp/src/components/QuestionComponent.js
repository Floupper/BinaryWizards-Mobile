import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { styleContainer } from "../styles/container";
import PrimaryButton from "./PrimaryButton";  
import { styleButton, determineButtonStyle } from "../styles/buttons";

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
          <PrimaryButton
            key={index}
            text={option}
            onPress={() => sendUserAnswer(index)}
            disabled={userAnswerIndex !== null}
            style={[styleButton.button, {backgroundColor: determineButtonStyle(index, userAnswerIndex, correctAnswer)}]}
          />
        ))
      ) : (
        <Text>No question available</Text>
      )}
    </View>
  );
}
