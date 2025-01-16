import React, { useEffect, useState } from 'react';
import ScrumQuestionComponent from '../../components/ScrumQuestion/ScrumQuestionComponent';
import { Text, View, ActivityIndicator, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GenericClipboard from '../../components/GenericClipboard';
import { questionStyle } from '../Questions/questionsStyles';
import { LinearGradient } from 'expo-linear-gradient';
import ProgressBar from 'react-native-progress/Bar';
import HomeButton from '../../components/HomeButton/HomeButton';
import { REACT_NATIVE_API_URL, REACT_NATIVE_API_PORT } from '@env';
import { io } from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import scrumBackground from '../../../assets/backgrounds/scrumBackground.png';
import Chrono from '../../components/Chrono/Chrono';

const SERVER_URL = `${REACT_NATIVE_API_URL}:${REACT_NATIVE_API_PORT}`;

export default function ScrumQuestionScreen({ route }) {
  const [gameId, setGameId] = useState(route.params.gameId);

  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(null);
  const [quizId, setQuizId] = useState(null);
  const [questionType, setQuestionType] = useState('');
  const [questionDifficulty, setQuestionDifficulty] = useState('');
  const [questionCategory, setQuestionCategory] = useState('');
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [idCorrectAnswers, setIdCorrectAnswers] = useState(null);
  const [socket, setSocket] = useState(null);

  const [userToken, setUserToken] = useState(null);
  const [question, setQuestion] = useState({});
  const [colorGradient, setColorGradient] = useState([
    '#377DC9',
    '#8A2BF2',
    '#E7DAB4',
  ]);
  const [timeAvailable, setTimeAvailable] = useState(null);

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
        setIdCorrectAnswers(data.correct_option_index);
        setIsAnswered(true);
        setTimeAvailable(null);
      });

      newSocket.on('newQuestion', handleNewQuestion);

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
    setQuestionType(data.question_type);
    setQuestionDifficulty(data.question_difficulty);
    setQuestionCategory(data.question_category);
    setQuizId(data.quiz_id);
    setIsAnswered(false);
    setIdCorrectAnswers(null);
    setTimeAvailable(data.question_timeout / 1000);
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
    <ImageBackground
      source={scrumBackground}
      style={{ width: '100%', height: '100%' }}
    >
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
            color="#8B2DF1"
            unfilledColor="#FFFFFF"
            borderWidth={0}
            borderRadius={5}
          />
        </View>

        <View style={questionStyle.infoQuestions}>
          {userToken ? <GenericClipboard text="id" id={gameId} /> : null}
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
            <ScrumQuestionComponent
              gameId={gameId}
              question={question}
              handleNewQuestion={handleNewQuestion}
            />
          </View>
        </LinearGradient>
      </View>
    </ImageBackground>
  );
}
