import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { styleContainer } from '../../styles/container';
import { styleButton } from '../../styles/buttons';
import PrimaryButton from '../PrimaryButton';
import { styles } from '../Question/styles';
import { sendAnswer } from '../../services/questionScreenRequests';
import { Asset } from 'expo-asset';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
// Props validation
TeamQuestionComponent.propTypes = {
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

export default function TeamQuestionComponent({
  question,
  correctAnswer,
  nextQuestion,
  gameId,
  questionIndex,
  setColorGradient,
  onQuestionSelect,
  setQuestion,
  setQuestionAnswer,
  endGame,
}) {
  const [userAnswerIndex, setUserAnswerIndex] = useState(null);
  const [background, setBackground] = useState('idle');
  const [isCorrect, setIsCorrect] = useState(false);
  const [socket, setSocket] = useState(null);
  const navigation = useNavigation();

  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState([]);
  const [nbQuestionsTotal, setNbQuestionsTotal] = useState(null);
  const [score, setScore] = useState(null);
  const [quizId, setQuizId] = useState(null);
  const [questionType, setQuestionType] = useState('');
  const [questionDifficulty, setQuestionDifficulty] = useState('');
  const [questionCategory, setQuestionCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [idCorrectAnswers, setIdCorrectAnswers] = useState(null);

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
    const connectToSocket = async () => {
      const userToken = await AsyncStorage.getItem('userToken');
      if (!userToken) {
        navigation.navigate('Signin', {
          redirectTo: 'TeamLobby',
          params: { gameId },
        });
        return;
      }

      const newSocket = io(SERVER_URL, {
        extraHeaders: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      newSocket.on('connect', () => {
        newSocket.emit('getQuestionInformations', { game_id: gameId });
      });

      newSocket.on('currentQuestion', (data) => {
        handleNewQuestion(data);
      });

      newSocket.on('newQuestion', (data) => {
        handleNewQuestion(data);
      });

      newSocket.on('gameFinished', (data) => {
        const { ranking } = data;
        navigation.navigate('TeamEndScreen', {
          ranking,
          nbQuestionsTotal,
          quizId,
          score,
        });
      });
      newSocket.on('answerResult', (data) => {
        console.log('TeamQuestionComponent -> data', data);
        setIdCorrectAnswers(data.correct_option_index);
        setIsAnswered(true);
        updateColors('idle');
      });

      setSocket(newSocket);
    };

    connectToSocket();

    return () => {
      if (socket) {
        so.disconnect();
      }
    };
  }, [gameId, navigation]);

  const backgroundAssets = {
    idle: require('../../../assets/questions/idle.png'),
    correct: require('../../../assets/questions/correct.png'),
    wrong: require('../../../assets/questions/wrong.png'),
  };

  const determineButtonStyle = (index) => {
    if (userAnswerIndex !== null) {
      if (index === idCorrectAnswers) {
        return { backgroundColor: 'green' };
      }
      if (index === userAnswerIndex) {
        return { backgroundColor: 'red' };
      }
    }
    return { backgroundColor: 'white' };
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
                onPress={() => {
                  onQuestionSelect(option_index);
                  setUserAnswerIndex(option_index);
                }}
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
      </View>
    </ImageBackground>
  );
}
