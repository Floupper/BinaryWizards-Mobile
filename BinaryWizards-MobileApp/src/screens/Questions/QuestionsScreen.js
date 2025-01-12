import React, { useEffect, useState, useRef } from 'react';
import QuestionComponent from '../../components/Question/QuestionComponent';
import { Text, View, ActivityIndicator } from 'react-native';
import { fetchQuestion } from '../../services/questionScreenRequests';
import { useNavigation } from '@react-navigation/native';
import { questionStyle } from './questionsStyles';
import { LinearGradient } from 'expo-linear-gradient';
import { sendAnswer } from '../../services/questionScreenRequests';
import ProgressBar from 'react-native-progress/Bar';
import userTokenEmitter from '../../utils/eventEmitter';
import HomeButton from '../../components/HomeButton/HomeButton';
import { REACT_NATIVE_API_URL, REACT_NATIVE_API_PORT } from '@env';
import Chrono from '../../components/Chrono/Chrono';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SERVER_URL = `${REACT_NATIVE_API_URL}:${REACT_NATIVE_API_PORT}`;

export default function QuestionScreen({ route }) {
  const [gameId, setGameId] = useState(route.params.gameId);
  const [quizId, setQuizId] = useState(route.params.quizId);
  const [userToken, setUserToken] = useState(null);
  const [question, setQuestion] = useState('');
  const [colorGradient, setColorGradient] = useState([
    '#FFA033',
    '#DBC0A2',
    '#779D25',
  ]);
  const [timeAvailable, setTimeAvailable] = useState(-1);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(null);
  const [userAnswerIndex, setUserAnswerIndex] = useState(null);

  const navigation = useNavigation();
  const chronoRef = useRef();
  const questionIndexRef = useRef(null);

  useEffect(async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');

      const socket = io(SERVER_URL, {
        transports: ['websocket'],
        extraHeaders: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      socket.on('newQuestion', () => {
        nextQuestion();
      });

      newSocket.on('disconnect', () => {
        console.log('Disconnected from WebSocket server');
      });
    } catch (error) {
      console.error('Error during connecting to websocket :', error);
    }
  }, [gameId]);

  useEffect(() => {
    setGameId(route.params.gameId);
    fetchAndSetQuestion();
  }, [route.params.gameId]);

  useEffect(() => {
    const listener = (newToken) => {
      //Disconnect the user if the token is invalid
      if (newToken === null) {
        navigation.navigate('Home');
      }
      setUserToken(newToken);
    };

    userTokenEmitter.on('userToken', listener);

    return () => {
      userTokenEmitter.off('userToken', listener);
    };
  }, []);

  const nextQuestion = () => {
    setIsTimeUp(false);
    setUserAnswerIndex(null);
    setCorrectAnswerIndex(null);
    fetchAndSetQuestion();
  };

  const fetchAndSetQuestion = async () => {
    if (chronoRef.current) {
      chronoRef.current.stopTimer();
    }

    const question_result = await fetchQuestion({
      gameId: route.params.gameId,
    });
    questionIndexRef.current = question_result.question_index;

    if (question_result.game_finished) {
      endGame(question_result);
      return;
    }

    setQuizId(question_result.quiz_id);
    setQuestion(question_result);

    // Reset the timer
    if (question_result.time_available != null) {
      setTimeAvailable(question_result.time_available);
      if (question_result.time_available <= 1) {
        setIsTimeUp(true);
        onSelectedAnswer(-1);
        return;
      }
      if (chronoRef.current) {
        chronoRef.current.resetTimer(question_result.time_available);
        chronoRef.current.startTimer();
      }
    }
  };

  const onSelectedAnswer = async (selectedAnswerIndex) => {
    if (userAnswerIndex !== null) {
      return null;
    }

    // Capture the current question index to debug potential outdated values
    const currentQuestionIndex = questionIndexRef.current;

    setUserAnswerIndex(selectedAnswerIndex);

    if (chronoRef.current) {
      console.log('Stopping timer...');
      chronoRef.current.stopTimer();
    }

    try {
      const result = await sendAnswer({
        gameId: gameId,
        question_index: currentQuestionIndex,
        option_index: selectedAnswerIndex,
      });

      setCorrectAnswerIndex(result.correct_option_index);

      if (selectedAnswerIndex === -1) {
        setIsTimeUp(true);
        return;
      }

      if (!result) {
        return;
      }

      if (result.resynchronize) {
        if (result.data.game_finished) {
          endGame(result.data);
          return;
        }
        setQuestion(result.data);
        return 'idle';
      }

      setIsTimeUp(false);
    } catch (error) {
      console.error('Error while sending answer:', error);
    }
  };

  const endGame = (question_result) => {
    navigation.navigate('End', {
      quizId: quizId,
      gameId: gameId,
      correct_answers_nb: question_result.correct_answers_nb,
      nb_questions_total: question_result.nb_questions_total,
      timer: question.time_limit,
    });
    setTimeAvailable(-1);
  };

  if (!question) {
    return (
      <View style={[questionStyle.mainContainer, { justifyContent: 'center' }]}>
        <ActivityIndicator size="large" color="#FFA033" />
      </View>
    );
  }

  return (
    <View style={questionStyle.mainContainer}>
      <HomeButton text="Leave game" />
      <View
        style={{
          paddingHorizontal: 20,
          marginBottom: 20,
          width: '100%',
          height: 20,
        }}
      >
        <ProgressBar
          progress={
            question.nb_questions_total > 0
              ? question.question_index / question.nb_questions_total
              : 0
          }
          width={null}
          height={17}
          color="#FFA033"
          unfilledColor="#FFFFFF"
          borderWidth={0}
          borderRadius={5}
        />
      </View>
      <View style={questionStyle.infoQuestions}>
        <Text style={[questionStyle.infoQuestionsText, { flex: 0.33 }]}>
          {question.question_index}/{question.nb_questions_total}
        </Text>
        {timeAvailable !== -1 ? (
          <Chrono
            ref={chronoRef}
            timeAvailable={timeAvailable}
            sendAnswer={onSelectedAnswer}
            onTimerEnd={onSelectedAnswer}
          />
        ) : null}
        <Text style={[questionStyle.infoQuestionsText, { flex: 0.33 }]}>
          Score : {question.correct_answers_nb}
        </Text>
      </View>

      <LinearGradient
        colors={colorGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={questionStyle.gradientContainer}
      >
        <View style={questionStyle.container}>
          <QuestionComponent
            question={question ? question : ''}
            onSelectedAnswer={onSelectedAnswer}
            nextQuestion={nextQuestion}
            setColorGradient={setColorGradient}
            isTimeUp={isTimeUp}
            correctAnswerIndex={correctAnswerIndex}
            userAnswerIndex={userAnswerIndex}
          />
        </View>
      </LinearGradient>
    </View>
  );
}
