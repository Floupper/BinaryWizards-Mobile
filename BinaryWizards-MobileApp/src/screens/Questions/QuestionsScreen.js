import React, { useEffect, useState } from 'react';
import QuestionComponent from '../../components/Question/QuestionComponent';
import { Text, View, ActivityIndicator } from 'react-native';
import { fetchQuestion } from '../../services/questionScreenRequests';
import { useNavigation } from '@react-navigation/native';
import GenericClipboard from '../../components/GenericClipboard';
import { questionStyle } from './questionsStyles';
import { LinearGradient } from 'expo-linear-gradient';
import ProgressBar from 'react-native-progress/Bar';
import userTokenEmitter from '../../utils/eventEmitter';
import HomeButton from '../../components/HomeButton/HomeButton';

export default function QuestionScreen({ route }) {
  const [gameId, setGameId] = useState(route.params.gameId);
  const [quizId, setQuizId] = useState(route.params.quizId);
  const [userToken, setUserToken] = useState(null);
  const [question, setQuestion] = useState('');
  const [questionAnswer, setQuestionAnswer] = useState(null);
  const [colorGradient, setColorGradient] = useState([
    '#FFA033',
    '#DBC0A2',
    '#779D25',
  ]);

  const navigation = useNavigation();

  const nextQuestion = () => {
    setQuestionAnswer(null);
    fetchAndSetQuestion();
  };

  const fetchAndSetQuestion = async () => {
    const question_result = await fetchQuestion({ gameId: gameId });
    if (question_result.game_finished) {
      endGame(question_result);
      return;
    }
    setQuizId(question_result.quiz_id);
    setQuestion(question_result);
  };

  const endGame = (question_result) => {
    navigation.navigate('End', {
      quizId: quizId,
      gameId: gameId,
      correct_answers_nb: question_result.correct_answers_nb,
      nb_questions_total: question_result.nb_questions_total,
    });
  };

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
          <QuestionComponent
            question={question ? question : ''}
            correctAnswer={questionAnswer}
            setQuestionAnswer={setQuestionAnswer}
            setQuestion={setQuestion}
            nextQuestion={nextQuestion}
            gameId={gameId}
            questionIndex={question.question_index}
            setColorGradient={setColorGradient}
            endGame={endGame}
          />
        </View>
      </LinearGradient>
    </View>
  );
}
