import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { styleContainer } from '../../styles/container';
import { styleButton } from '../../styles/buttons';
import PrimaryButton from '../PrimaryButton';
import { styles } from './styles';
import { questionContext } from '../../utils/questionContext.enum';
import { Asset } from 'expo-asset';
import PropTypes from 'prop-types';

// Props validation
QuestionComponent.propTypes = {
  question: PropTypes.object.isRequired,
  nextQuestion: PropTypes.func.isRequired,
  onSelectedAnswer: PropTypes.func.isRequired,
  setColorGradient: PropTypes.func.isRequired,
  isTimeUp: PropTypes.bool.isRequired,
  correctAnswerIndex: PropTypes.number,
  userAnswerIndex: PropTypes.number,
};

export default function QuestionComponent({
  question,
  nextQuestion,
  onSelectedAnswer,
  setColorGradient,
  isTimeUp,
  correctAnswerIndex,
  userAnswerIndex,
}) {
  const [background, setBackground] = useState(questionContext.IDLE);

  const backgroundAssets = {
    idle: require('../../../assets/questions/idle.png'),
    correct: require('../../../assets/questions/correct.png'),
    wrong: require('../../../assets/questions/wrong.png'),
  };

  const determineButtonStyle = (buttonIndex) => {
    const COLORS = {
      default: 'white',
      correct: 'green',
      incorrect: 'red',
      unanswered: 'white',
      timeUp: 'orange',
    };

    if (userAnswerIndex === null || correctAnswerIndex === null) {
      return { backgroundColor: COLORS.default };
    }

    if (isTimeUp) {
      if (buttonIndex === correctAnswerIndex) {
        return { backgroundColor: COLORS.correct };
      }
      return { backgroundColor: COLORS.incorrect };
    }

    if (buttonIndex === correctAnswerIndex) {
      return { backgroundColor: COLORS.correct };
    }
    if (buttonIndex === userAnswerIndex && buttonIndex !== correctAnswerIndex) {
      return { backgroundColor: COLORS.incorrect };
    }
    return { backgroundColor: COLORS.default };
  };

  const updateColors = (context) => {
    const BACKGROUND_COLORS = {
      idle: ['#FFA033', '#DBC0A2', '#779D25'],
      correct: ['#417336', '#417336', '#417336'],
      wrong: ['#F22828', '#F22828', '#F22828'],
    };

    const BACKGROUNDS = {
      idle: questionContext.IDLE,
      correct: questionContext.CORRECT,
      wrong: questionContext.WRONG,
    };

    setColorGradient(BACKGROUND_COLORS[context]);
    setBackground(BACKGROUNDS[context]);
  };

  const handleNextQuestion = () => {
    nextQuestion();
  };

  useEffect(() => {
    const preloadAssets = async () => {
      await Asset.loadAsync([
        require('../../../assets/questions/idle.png'),
        require('../../../assets/questions/correct.png'),
        require('../../../assets/questions/wrong.png'),
      ]);
    };
    preloadAssets();
  }, []);

  useEffect(() => {
    if (userAnswerIndex === null && correctAnswerIndex === null) {
      updateColors(questionContext.IDLE);
      return;
    }
    if (
      userAnswerIndex !== null &&
      correctAnswerIndex !== null &&
      userAnswerIndex !== correctAnswerIndex
    ) {
      updateColors(questionContext.WRONG);
      return;
    }
    if (
      userAnswerIndex !== null &&
      correctAnswerIndex !== null &&
      userAnswerIndex === correctAnswerIndex
    ) {
      updateColors(questionContext.CORRECT);
      return;
    }
  }, [isTimeUp, correctAnswerIndex, userAnswerIndex]); // If userAnswerIndex is modified, correctAnswerIndex is modified, and the useEffect is triggered

  const handleSelectedAnswer = async (answerIndex) => {
    await onSelectedAnswer(answerIndex);
  };

  return (
    <ImageBackground
      source={backgroundAssets[background]}
      style={styles.questionContainer}
    >
      <View
        style={{
          height: '100%',
          width: '100%',
          justifyContent: 'space-around',
        }}
      >
        <Text style={styleContainer.questionTitleContainer}>
          {question.question_text}
        </Text>
        <View>
          {question.options && Array.isArray(question.options) ? (
            question.options.map(({ option_content, option_index }) => (
              <PrimaryButton
                key={option_index}
                text={option_content.content}
                onPress={() => handleSelectedAnswer(option_index)}
                isQuestion={true}
                style={[
                  styles.answerButtonBaseStyle,
                  determineButtonStyle(option_index),
                ]}
              />
            ))
          ) : (
            <Text>No question available</Text>
          )}
        </View>
        <PrimaryButton
          onPress={handleNextQuestion}
          disabled={userAnswerIndex === null}
          text={'Next question'}
          style={styleButton.button}
        />
      </View>
    </ImageBackground>
  );
}
