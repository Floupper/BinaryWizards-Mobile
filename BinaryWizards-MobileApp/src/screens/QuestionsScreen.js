import React, { useEffect, useState, useCallback } from "react";
import QuestionComponent from "../components/QuestionComponent";
import { Text, View } from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import { fetchQuestion, sendAnswer } from "../services/requests";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { styleContainer } from "../styles/container";
import { styleText } from "../styles/text";
import { styleButton } from "../styles/buttons";
import HomeButton from "../components/HomeButton";
import Feather from '@expo/vector-icons/Feather';
import * as Clipboard from 'expo-clipboard';
import Toast from 'react-native-toast-message';

export default function QuestionScreen({ route }) {
  const { gameId } = route.params;
  const [quizId, setQuizId] = useState("");
  const [question, setQuestion] = useState("");
  const [questionAnswer, setQuestionAnswer] = useState(null);

  const navigation = useNavigation();

  const copyGameIdToClipboard = () => {
    Clipboard.setString(gameId);
    Toast.show({
      type: 'success',
      text1: 'Copied to clipboard',
      text2: 'Quiz id copied to clipboard !',
    });
  };

  const copyQuizIdToClipboard = () => {
    Clipboard.setString(quizId);
    Toast.show({
      type: 'success',
      text1: 'Copied to clipboard',
      text2: 'Quiz id copied to clipboard !',
    });
  };

  const nextQuestion = () => {
    setQuestionAnswer(null);
    fetchAndSetQuestion();
  };

  const fetchAndSetQuestion = async () => {
    const question_result = await fetchQuestion({ gameId: gameId }); // Change IP address to your own
    if (question_result.game_finished) {
      navigation.navigate("End", {
        gameId: gameId,
        correct_answers_nb: question_result.correct_answers_nb,
        nb_questions_total: question_result.nb_questions_total,
      });
      return;
    }
    setQuizId(question_result.quiz_id);
    setQuestion(question_result);
  };

  useEffect(() => {
    fetchAndSetQuestion();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchAndSetQuestion();
    }, [])
  );

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
      } else {
        console.error("Error: API returned null or undefined.");
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Failed to submit your answer. Please try again.',
        });
      }
    } catch (error) {
      console.error("Error:", error);
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
      <View style={styleContainer.quizIdContainer}>
        <Text style={styleText.quizIdText}>Game id : {gameId}</Text>
        <Feather name="copy" size={24} color="black" onPress={copyGameIdToClipboard} />
      </View>
      <View style={styleContainer.quizIdContainer}>
        <Text style={styleText.gameIdText}>Game id : {gameId}</Text>
        <Feather name="copy" size={24} color="black" onPress={copyQuizIdToClipboard} />
      </View>
      <View style={styleContainer.infoContainer}>
        <Text>
          Score : {question.correct_answers_nb}
        </Text>
        <Text>
          Question : {question.question_index}/{question.nb_questions_total}
        </Text>
      </View>
      <View style={styleContainer.contentContainer}>
        <QuestionComponent
          question={question ? question : ""}
          selectedAnswer={onSelectedAnswer}
          correctAnswer={questionAnswer}
        />
      </View>
      <PrimaryButton
        onPress={nextQuestion}
        disabled={questionAnswer === null}
        text={"Next question"}
        style={styleButton.button}
      />
    </View>
  );
}
