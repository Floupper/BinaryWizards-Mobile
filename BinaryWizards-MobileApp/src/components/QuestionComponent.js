import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { styleContainer } from '../styles/container';
import PrimaryButton from './PrimaryButton';
import { styleButton, determineButtonStyle } from '../styles/buttons';

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
            disabled={userAnswerIndex !== null}
            isQuestion={true}
            style={[
              styleButton.button,
              {
                backgroundColor: determineButtonStyle(
                  option_index,
                  userAnswerIndex,
                  correctAnswer
                ),
              },
            ]}
          />
        ))
      ) : (
        <Text>No question available</Text>
      )}
    </View>
  );
}
