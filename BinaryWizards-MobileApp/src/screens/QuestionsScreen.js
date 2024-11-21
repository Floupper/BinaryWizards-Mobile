import React, { useEffect, useState, useCallback } from "react";
import QuestionComponent from "../components/QuestionComponent";
import { Text, View } from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import { fetchQuestion, sendAnswer } from "../services/questionScreenRequests";
import { useNavigation } from "@react-navigation/native";
import { styleContainer } from "../styles/container";
import { styleButton } from "../styles/buttons";
import HomeButton from "../components/HomeButton";
import Toast from 'react-native-toast-message';
import GenericClipboard from "../components/GenericClipboard";

export default function QuestionScreen({ route }) {
  const [gameId, setGameId] = useState(route.params.gameId);
  const [quizId, setQuizId] = useState(route.params.quizId);
  const [question, setQuestion] = useState("");
  const [questionAnswer, setQuestionAnswer] = useState(null);

  const navigation = useNavigation();

  const nextQuestion = () => {
    setQuestionAnswer(null);
    fetchAndSetQuestion();
  };

  const fetchAndSetQuestion = async () => {
    const currentGameId = route.params.gameId;
    const question_result = await fetchQuestion({ gameId: currentGameId });
    if (question_result.game_finished) {
      navigation.navigate("End", {
        quizId: quizId,
        gameId: currentGameId,
        correct_answers_nb: question_result.correct_answers_nb,
        nb_questions_total: question_result.nb_questions_total,
      });
      return;
    }
    setQuizId(question_result.quiz_id);
    setQuestion(question_result);
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
      } else {
        console.error("Error: API returned null or undefined.");
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Failed to submit your answer. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "An error occurred while submitting your answer.",
      });
    }
  };

  return (
    <View style={styleContainer.mainContainer}>
      <View>
        <HomeButton />
      </View>
      <View>
        <GenericClipboard text="Game id" id={gameId} />
      </View>
      <View>
        <GenericClipboard text="Quiz id" id={quizId} />
      </View>
      <View style={styleContainer.infoContainer}>
        <Text>Score : {question.correct_answers_nb}</Text>
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
