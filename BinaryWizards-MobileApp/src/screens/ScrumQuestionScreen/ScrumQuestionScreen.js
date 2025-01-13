import React, { useEffect, useState, useRef } from 'react';
import ScrumQuestionComponent from '../../components/ScrumQuestion/ScrumQuestionComponent';
import { Text, View, ActivityIndicator } from 'react-native';
import { fetchQuestion } from '../../services/questionScreenRequests';
import { useNavigation } from '@react-navigation/native';
import GenericClipboard from '../../components/GenericClipboard';
import { questionStyle } from '../Questions/questionsStyles';
import { LinearGradient } from 'expo-linear-gradient';
import ProgressBar from 'react-native-progress/Bar';
import userTokenEmitter from '../../utils/eventEmitter';
import HomeButton from '../../components/HomeButton/HomeButton';
import { REACT_NATIVE_API_URL, REACT_NATIVE_API_PORT } from '@env';
import { io } from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SERVER_URL = `${REACT_NATIVE_API_URL}:${REACT_NATIVE_API_PORT}`;

export default function ScrumQuestionScreen({ route }) {
  const [gameId, setGameId] = useState(route.params.gameId);

  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(null);
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
  const [timeAvailable, setTimeAvailable] = useState(null);
  const chronoRef = useRef();
  const [socket, setSocket] = useState(null);

  const [userToken, setUserToken] = useState(null);
  const [question, setQuestion] = useState({});
  const [questionAnswer, setQuestionAnswer] = useState(null);
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
          redirectTo: 'ScrumLobby',
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

      newSocket.on('answerResult', (data) => {
        console.log('Answer result:', data);
        setIdCorrectAnswers(data.correct_option_index);
        setIsAnswered(true);
      });

      newSocket.on('newQuestion', handleNewQuestion);

      newSocket.on('gameFinished', ({ ranking }) => {
        navigation.navigate('ScrumEndScreen', {
          ranking,
          nbQuestionsTotal,
          quizId,
          score,
        });
      });

      setSocket(newSocket);
    };

    connectToSocket();

    return () => {
      socket?.disconnect();
    };
  }, [gameId, navigation]);

  const handleNewQuestion = (data) => {
    setQuestion(data);
    setQuestionText(data.question_text);
    setOptions(data.options);
    setQuestionIndex(data.question_index);
    setNbQuestionsTotal(data.nb_questions_total);
    setScore(data.correct_answers_nb);
    setQuestionType(data.question_type);
    setQuestionDifficulty(data.question_difficulty);
    setQuestionCategory(data.question_category);
    setQuizId(data.quiz_id);
    setIsAnswered(false);
    setIdCorrectAnswers(null);
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
        {userToken ? <GenericClipboard text="id" id={gameId} /> : null}
        <Text style={questionStyle.infoQuestionsText}>
          {question.question_index}/{question.nb_questions_total}
        </Text>
        <Text style={questionStyle.infoQuestionsText}>
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
          <ScrumQuestionComponent
            gameId={gameId}
            question={question}
            question_choices={options}
            correctOptionsIndex={idCorrectAnswers}
            selectedQuestionId={selectedQuestionId}
            isAnswered={isAnswered}
          />
        </View>
      </LinearGradient>
    </View>
  );
}
