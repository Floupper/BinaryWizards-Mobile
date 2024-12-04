import React, { useEffect, useState, useMemo } from 'react';
import { View, Text } from 'react-native';
import { styleContainer } from '../styles/container';
import PrimaryButton from './PrimaryButton';

export default function QuestionComponent({
  question,
  selectedAnswer,
  correctAnswer,
}) {
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

  const determineButtonStyle = useMemo(
    () => (index) => {
      const baseStyle = {
        padding: 10,
        margin: 10,
        color: 'black',
        borderRadius: 10,
        alignItems: 'center',
        elevation: 10, // Shadow on Android
        shadowColor: '#000', // Shadow on iOS
        shadowOffset: { width: 0, height: 4 }, // Shadow position on iOS
        shadowOpacity: 0.3, // on iOS
        shadowRadius: 4, // on iOS
        opacity: 1,
      };

      const COLORS = {
        default: 'white',
        correct: 'green',
        incorrect: 'red',
        unanswered: 'white',
      };

      if (index === correctAnswer?.correct_option_index) {
        return {
          ...baseStyle,
          backgroundColor: COLORS.correct,
        };
      } else if (userAnswerIndex === null) {
        return {
          ...baseStyle,
          backgroundColor: COLORS.unanswered,
        };
      } else if (index === userAnswerIndex && correctAnswer?.correct_option_index != null) {
        return {
          ...baseStyle,
          backgroundColor: COLORS.incorrect,
        };
      } else {
        return {
          ...baseStyle,
          backgroundColor: COLORS.default,
        };
      }
    },
    [userAnswerIndex, correctAnswer, question]
  );

  return (
    <View>
      <Text style={styleContainer.questionTitleContainer}>
        {question.question_text}
      </Text>
      {question.options && Array.isArray(question.options) ? (
        question.options.map(({ option_text, option_index }) => (
          <PrimaryButton
            key={option_index}
            text={option_text}
            onPress={() => sendUserAnswer(option_index)}
            isQuestion={true}
            style={determineButtonStyle(option_index)}
          />
        ))
      ) : (
        <Text>No question available</Text>
      )}
    </View>
  );
}
