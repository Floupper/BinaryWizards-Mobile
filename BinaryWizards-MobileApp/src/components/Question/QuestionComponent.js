import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { styleButton } from '../../styles/buttons';
import { styles } from './styles';
import { questionContext } from '../../utils/questionContext.enum';
import { Asset } from 'expo-asset';
import PropTypes from 'prop-types';
import ImageContainer from '../ImageContainer/ImageContainer';
import SecondaryButton from '../SecondaryButton';
import {
  determineButtonStyle,
  determineButtonTextStyle,
} from '../../utils/questions.utils';

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
        <Text style={styles.questionTitleContainer}>
          {question.question_text}
        </Text>
        <View>
          {question.question_type === 'image' ? (
            <ImageContainer
              options={question.options}
              onPress={handleSelectedAnswer}
              determineButtonStyle={determineButtonStyle}
            />
          ) : (
            question.options.map(({ option_content, option_index }) => (
              <SecondaryButton
                key={option_index}
                text={option_content}
                onPress={() => handleSelectedAnswer(option_index)}
                style={[
                  styles.answerButtonBaseStyle,
                  determineButtonStyle({
                    buttonIndex: option_index,
                    userAnswerIndex,
                    correctAnswerIndex,
                    isTimeUp,
                  }),
                ]}
                textStyle={[
                  styles.answerButtonTextStyle,
                  determineButtonTextStyle({
                    buttonIndex: option_index,
                    userAnswerIndex,
                    correctAnswerIndex,
                    isTimeUp,
                  }),
                ]}
              />
            ))
          )}
        </View>
        <SecondaryButton
          onPress={handleNextQuestion}
          disabled={userAnswerIndex === null}
          text={'Next question'}
          style={styleButton.button}
          textStyle={styleButton.textStyle}
        />
      </View>
    </ImageBackground>
  );
}
