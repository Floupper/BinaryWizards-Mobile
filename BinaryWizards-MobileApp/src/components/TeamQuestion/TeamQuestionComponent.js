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

      socketRef.current = newSocket;

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
        navigation.navigate('TeamEndScreen', {
          data,
        });
      });

      newSocket.on('answerResult', (data) => {
        setIdCorrectAnswers(data.correct_option_index);
        setIsAnswered(true);
        setShowAnswer(true);

        setTimeout(() => {
          setShowAnswer(true);
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

  useEffect(() => {
    setShowAnswer(false);
    setUserAnswerIndex(null);
    setIdCorrectAnswers(null);
    setIsAnswered(false);
    setBackground('idle');
  }, [question]);

  const handleQuestionSelect = (selectedId) => {
    if (isAnswered) {
      return;
    }
    setSelectedQuestionId(selectedId);
    setIsAnswered(true);

    socketRef.current.emit('sendAnswer', {
      game_id: gameId,
      question_id: question.question_index,
      option_index: selectedId,
    });
  };

  const backgroundAssets = {
    idle: require('../../../assets/questions/idle.png'),
    correct: require('../../../assets/questions/correct.png'),
    wrong: require('../../../assets/questions/wrong.png'),
  };

  const determineButtonTextStyle = ({
    buttonIndex,
    userAnswerIndex,
    correctAnswerIndex,
    isTimeUp,
  }) => {
    if (!showAnswer) {
      // Si showAnswer est false, tous les textes des boutons restent noirs
      return { color: 'black' };
    }

    if (userAnswerIndex === null || correctAnswerIndex === null) {
      return { color: 'black' };
    }

    if (isTimeUp) {
      if (buttonIndex === correctAnswerIndex) {
        return { color: 'green' };
      }
      return { color: 'red' };
    }

    if (buttonIndex === correctAnswerIndex) {
      return { color: 'green' };
    }
    if (buttonIndex === userAnswerIndex && buttonIndex !== correctAnswerIndex) {
      return { color: 'red' };
    }
    return { color: 'black' };
  };

  const determineButtonStyle = ({
    buttonIndex,
    correctAnswerIndex,
    userAnswerIndex,
    isTimeUp,
  }) => {
    const COLORS = {
      default: '#e5e7eb', // Gris clair par défaut
      selected: '#f3f4f6', // Gris plus clair pour le bouton sélectionné
      correct: 'green', // Vert pour la bonne réponse
      incorrect: 'red', // Rouge pour la mauvaise réponse
      unanswered: '#e5e7eb',
      timeUp: 'orange',
    };

    if (!showAnswer) {
      // Si showAnswer est false, affiche le fond gris clair pour le bouton sélectionné
      return buttonIndex === userAnswerIndex
        ? { borderColor: COLORS.default, backgroundColor: COLORS.selected }
        : { borderColor: COLORS.default };
    }

    if (userAnswerIndex === null || correctAnswerIndex === null) {
      return { borderColor: COLORS.default };
    }

    if (isTimeUp) {
      if (buttonIndex === correctAnswerIndex) {
        return { borderColor: COLORS.correct };
      }
      return { borderColor: COLORS.incorrect };
    }

    if (buttonIndex === correctAnswerIndex) {
      return { borderColor: COLORS.correct };
    }
    if (buttonIndex === userAnswerIndex && buttonIndex !== correctAnswerIndex) {
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
                      // isTimeUp,
                    }),
                  ]}
                  textStyle={[
                    styles.answerButtonTextStyle,
                    determineButtonTextStyle({
                      buttonIndex: option_index,
                      userAnswerIndex: selectedQuestionId,
                      correctAnswerIndex: idCorrectAnswers,
                      // isTimeUp,
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
