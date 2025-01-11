import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { styleContainer } from '../../styles/container';
import { styleButton } from '../../styles/buttons';
import PrimaryButton from '../PrimaryButton';
import { styles } from './styles';
import { sendAnswer } from '../../services/questionScreenRequests';
import { Asset } from 'expo-asset';
import PropTypes from 'prop-types';

// Props validation
QuestionComponent.propTypes = {
  question: PropTypes.object,
  correctAnswer: PropTypes.object,
  nextQuestion: PropTypes.func,
  gameId: PropTypes.string,
  questionIndex: PropTypes.number,
  setColorGradient: PropTypes.func,
  setQuestion: PropTypes.func,
  setQuestionAnswer: PropTypes.func,
  endGame: PropTypes.func,
};

export default function QuestionComponent({
  question,
  correctAnswer,
  nextQuestion,
  gameId,
  questionIndex,
  setColorGradient,
  setQuestion,
  setQuestionAnswer,
  endGame,
}) {
  const [userAnswerIndex, setUserAnswerIndex] = useState(null);
  const [background, setBackground] = useState('idle');
  const [isCorrect, setIsCorrect] = useState(false);

  const updateColors = (context, index = null) => {
    const BACKGROUND_COLORS = {
      idle: ['#FFA033', '#DBC0A2', '#779D25'],
      correct: ['#417336', '#417336', '#417336'],
      wrong: ['#F22828', '#F22828', '#F22828'],
    };

    const BACKGROUNDS = {
      idle: 'idle',
      correct: 'correct',
      wrong: 'wrong',
    };

    setColorGradient(BACKGROUND_COLORS[context]);
    setBackground(BACKGROUNDS[context]);

    if (context === 'correct' || context === 'wrong') {
      setUserAnswerIndex(index);
    } else if (context === 'idle') {
      setUserAnswerIndex(null);
    }
  };

  const handleNextQuestion = () => {
    nextQuestion();
    updateColors('idle');
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

  const onSelectedAnswer = async (index) => {
    if (userAnswerIndex !== null) return;

    try {
      const result = await sendAnswer({
        gameId: gameId,
        question_index: questionIndex,
        option_index: index,
      });

      if (!result) return;

      if (result.resynchronize) {
        if (result.data.game_finished) {
          endGame(result.data);
          return;
        }
        setQuestion(result.data);
        setQuestionAnswer(null);
        updateColors('idle');
        return;
      }
      const context = result.is_correct ? 'correct' : 'wrong';
      setIsCorrect(result.is_correct);

      updateColors(context, index);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const backgroundAssets = {
    idle: require('../../../assets/questions/idle.png'),
    correct: require('../../../assets/questions/correct.png'),
    wrong: require('../../../assets/questions/wrong.png'),
  };

  const determineButtonStyle = (index) => {
    const COLORS = {
      default: 'white',
      correct: 'green',
      incorrect: 'red',
      unanswered: 'white',
    };

    if (index === userAnswerIndex && isCorrect) {
      return { backgroundColor: COLORS.correct };
    } else if (index === userAnswerIndex && !isCorrect) {
      return { backgroundColor: COLORS.incorrect };
    } else {
      return { backgroundColor: COLORS.default };
    }
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
                onPress={() => onSelectedAnswer(option_index)}
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
