import React, { useEffect, useState } from 'react';
import QuestionComponent from '../../components/QuestionComponent';
import { Text, View } from 'react-native';
import PrimaryButton from '../../components/PrimaryButton';
import {
  fetchQuestion,
  sendAnswer,
} from '../../services/questionScreenRequests';
import { useNavigation } from '@react-navigation/native';
import { styleContainer } from '../../styles/container';
import { styleButton } from '../../styles/buttons';
import HomeButton from '../../components/HomeButton';
import Toast from 'react-native-toast-message';
import GenericClipboard from '../../components/GenericClipboard';
import { questionStyle } from './questionsStyles';
import { LinearGradient } from 'expo-linear-gradient';
import ProgressBar from 'react-native-progress/Bar';

export default function QuestionScreen({ route }) {
  const [gameId, setGameId] = useState(route.params.gameId);
  const [quizId, setQuizId] = useState(route.params.quizId);
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
    const currentGameId = route.params.gameId;
    const question_result = await fetchQuestion({ gameId: currentGameId });
    if (question_result.game_finished) {
      navigation.navigate('End', {
        quizId: quizId,
        gameId: currentGameId,
        correct_answers_nb: question_result.correct_answers_nb,
        nb_questions_total: question_result.nb_questions_total,
      });
      return;
    }
    setQuizId(question_result.quiz_id);
    setQuestion(question_result);
    setColorGradient(['#FFA033', '#DBC0A2', '#779D25']);
  };

  useEffect(() => {
    setGameId(route.params.gameId);
    fetchAndSetQuestion();
  }, [route.params.gameId]);

  onSelectedAnswer = async (index) => {
    try {
      const result = await sendAnswer({
        gameId: gameId,
        question_index: question.question_index,
        option_index: index,
      });

      if (result) {
        result.user_answer_index = index;
        setQuestionAnswer(result);

        if (result.is_correct) {
          setColorGradient(['#417336', '#417336', '#417336']);
        } else {
          setColorGradient(['#F22828', '#F22828', '#F22828']);
        }
      } else {
        console.error('Error: API returned null or undefined.');
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Failed to submit your answer. Please try again.',
        });
      }
    } catch (error) {
      console.error('Error:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'An error occurred while submitting your answer.',
      });
    }
  };

  return (
    <View style={styleContainer.mainContainer}>
      <View>
        <HomeButton />
      </View>
      <View style={questionStyle.mainContainer}>
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
          <GenericClipboard text="id" id={gameId} />
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
          <View style={questionStyle.questionContainer}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <QuestionComponent
                question={question ? question : ''}
                selectedAnswer={onSelectedAnswer}
                correctAnswer={questionAnswer}
              />
            </View>
            <PrimaryButton
              onPress={nextQuestion}
              disabled={questionAnswer === null}
              text={'Next question'}
              style={[styleButton.button, { marginBottom: 20 }]}
            />
          </View>
        </LinearGradient>
      </View>
    </View>
  );
}
