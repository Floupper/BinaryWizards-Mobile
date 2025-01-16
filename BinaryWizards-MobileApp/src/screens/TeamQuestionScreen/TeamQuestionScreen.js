import React, { useEffect, useState, useRef } from 'react';
import TeamQuestionComponent from '../../components/TeamQuestion/TeamQuestionComponent';
import { Text, View, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GenericClipboard from '../../components/GenericClipboard';
import { questionStyle } from '../Questions/questionsStyles';
import { LinearGradient } from 'expo-linear-gradient';
import ProgressBar from 'react-native-progress/Bar';
import HomeButton from '../../components/HomeButton/HomeButton';
import { REACT_NATIVE_API_URL, REACT_NATIVE_API_PORT } from '@env';
import { io } from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Chrono from '../../components/Chrono/Chrono';

const SERVER_URL = `${REACT_NATIVE_API_URL}:${REACT_NATIVE_API_PORT}`;

export default function TeamQuestionScreen({ route }) {
  const [gameId, setGameId] = useState(route.params.gameId);

  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(null);
  const [quizId, setQuizId] = useState(null);
  const [questionType, setQuestionType] = useState('');
  const [questionDifficulty, setQuestionDifficulty] = useState('');
  const [questionCategory, setQuestionCategory] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [idCorrectAnswers, setIdCorrectAnswers] = useState(null);
  const [timeAvailable, setTimeAvailable] = useState(null);
  const [socket, setSocket] = useState(null);

  const socketRef = useRef(null);

  const [question, setQuestion] = useState({});
  const [colorGradient, setColorGradient] = useState([
    '#FFA033',
    '#DBC0A2',
    '#779D25',
  ]);

  const navigation = useNavigation();

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

      newSocket.on('currentQuestion', handleNewQuestion);

      newSocket.on('newQuestion', handleNewQuestion);

      newSocket.on('answerResult', (data) => {
        setIdCorrectAnswers(data.correct_option_index);
        setIsAnswered(true);
      });

      setSocket(newSocket);
      socketRef.current = newSocket;
    };

    connectToSocket();

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [gameId, navigation]);

  const handleNewQuestion = (data) => {
    setQuestion(data);
    setQuestionText(data.question_text);
    setOptions(data.options);
    setQuestionIndex(data.question_index);
    setQuestionType(data.question_type);
    setQuestionDifficulty(data.question_difficulty);
    setQuestionCategory(data.question_category);
    setQuizId(data.quiz_id);
    setTimeAvailable(data.time_available);
    setIsAnswered(false);
    setIdCorrectAnswers(null);
  };

  const onTimerEnd = () => {
    setTimeAvailable(null);
    setIsAnswered(true);
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
        {timeAvailable ? (
          <Chrono timeAvailable={timeAvailable} onTimerEnd={onTimerEnd} />
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
          <TeamQuestionComponent
            gameId={gameId}
            question={question}
            handleNewQuestion={handleNewQuestion}
          />
        </View>
      </LinearGradient>
    </View>
  );
}
