import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ImageBackground, ActivityIndicator } from 'react-native';
import { styleContainer } from '../../styles/container';
import { styles } from '../Question/styles';
import { Asset } from 'expo-asset';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import { io } from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { REACT_NATIVE_API_URL, REACT_NATIVE_API_PORT } from '@env';
import ImageContainer from '../ImageContainer/ImageContainer';
import SecondaryButton from '../SecondaryButton';

const SERVER_URL = `${REACT_NATIVE_API_URL}:${REACT_NATIVE_API_PORT}`;

// Props validation
TeamQuestionComponent.propTypes = {
  question: PropTypes.object,
  gameId: PropTypes.string,
  setColorGradient: PropTypes.func,
};

export default function TeamQuestionComponent({
  question,
  gameId,
  setColorGradient,
  handleNewQuestion,
}) {
  const [userAnswerIndex, setUserAnswerIndex] = useState(null);
  const [background, setBackground] = useState('idle');
  const [isCorrect, setIsCorrect] = useState(false);
  const socketRef = useRef(null);
  const navigation = useNavigation();

  const [selectedQuestionId, setSelectedQuestionId] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [idCorrectAnswers, setIdCorrectAnswers] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const updateColors = (context, index = null) => {
    const BACKGROUND_COLORS = {
      idle: ['#E7DAB4', '#8A2BF2', '#377DC9'],
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

      socketRef.current = newSocket;

      newSocket.on('connect', () => {
        newSocket.emit('getQuestionInformations', { game_id: gameId });
      });

      newSocket.on('currentQuestion', (data) => {
        handleNewQuestion(data);
      });

      newSocket.on('newQuestion', (data) => {
        handleNewQuestion(data);
        setSelectedQuestionId(null);
      });

      newSocket.on('gameFinished', (data) => {
        navigation.navigate('TeamEndScreen', {
          data,
        });
      });

      newSocket.on('answerResult', (data) => {
        setIdCorrectAnswers(data.correct_option_index);
        setIsAnswered(true);
        setShowAnswer(true);

        setTimeout(() => {
          setShowAnswer(false);
        }, 5000);
      });

      newSocket.on('isCorrectAnswer', (data) => {
        setIsCorrect(data);
      });
    };

    connectToSocket();

    return () => {
      if (socketRef) {
        socketRef.current.disconnect();
      }
    };
  }, [gameId, navigation]);

  const handleQuestionSelect = (selectedId) => {
    if (isAnswered) {
      return;
    }
    setSelectedQuestionId(selectedId);
    setIsAnswered(true);

    socketRef.current.emit('sendAnswer', {
      game_id: gameId,
      question_index: question.question_index,
      option_index: selectedId,
    });
  };

  useEffect(() => {
    setShowAnswer(false);
    setSelectedQuestionId(null);
    setIdCorrectAnswers(null);
    setIsAnswered(false);
    setBackground('idle');
  }, [question]);

  const backgroundAssets = {
    idle: require('../../../assets/questions/idle.png'),
    correct: require('../../../assets/questions/correct.png'),
    wrong: require('../../../assets/questions/wrong.png'),
  };

  const determineButtonTextStyle = ({
    buttonIndex,
    userAnswerIndex,
    correctAnswerIndex,
  }) => {
    if (!showAnswer) {
      return { color: 'black' };
    }

    if (correctAnswerIndex === null) {
      return { color: 'black' };
    }

    if (buttonIndex === correctAnswerIndex) {
      return { color: 'green' };
    }

    if (userAnswerIndex !== null && buttonIndex === userAnswerIndex) {
      return { color: 'red' };
    }

    return { color: 'black' };
  };

  const determineButtonStyle = ({
    buttonIndex,
    correctAnswerIndex,
    userAnswerIndex,
  }) => {
    const COLORS = {
      default: '#e5e7eb',
      selected: '#e5e7eb',
      correct: 'green',
      incorrect: 'red',
      unanswered: '#e5e7eb',
    };

    if (!showAnswer) {
      return buttonIndex === userAnswerIndex
        ? { borderColor: '#8B2DF1', backgroundColor: COLORS.default }
        : { borderColor: COLORS.default };
    }

    if (correctAnswerIndex === null) {
      return { borderColor: COLORS.default };
    }

    if (buttonIndex === correctAnswerIndex) {
      return { borderColor: COLORS.correct };
    }

    if (userAnswerIndex !== null && buttonIndex === userAnswerIndex) {
      return { borderColor: COLORS.incorrect };
    }

    return { borderColor: COLORS.default };
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
          {selectedQuestionId}
        </Text>
        <View>
          {question && Array.isArray(question.options) ? (
            question.question_type === 'image' ? (
              <ImageContainer
                options={question.options}
                onPress={handleQuestionSelect}
                determineButtonStyle={determineButtonStyle}
                userAnswerIndex={selectedQuestionId}
                correctAnswerIndex={idCorrectAnswers}
              />
            ) : (
              question.options.map(({ option_content, option_index }) => (
                <SecondaryButton
                  key={option_index}
                  text={option_content}
                  onPress={() => handleQuestionSelect(option_index)}
                  style={[
                    styles.answerButtonBaseStyle,
                    determineButtonStyle({
                      buttonIndex: option_index,
                      userAnswerIndex: selectedQuestionId,
                      correctAnswerIndex: idCorrectAnswers,
                    }),
                  ]}
                  textStyle={[
                    styles.answerButtonTextStyle,
                    determineButtonTextStyle({
                      buttonIndex: option_index,
                      userAnswerIndex: selectedQuestionId,
                      correctAnswerIndex: idCorrectAnswers,
                    }),
                  ]}
                />
              ))
            )
          ) : (
            <ActivityIndicator size="large" color="#0000ff" />
          )}
        </View>
      </View>
    </ImageBackground>
  );
}
