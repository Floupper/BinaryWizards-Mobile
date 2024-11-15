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

export default function QuestionScreen({ route }) {
  const { quizId } = route.params;
  const [question, setQuestion] = useState("");
  const [questionAnswer, setQuestionAnswer] = useState(null);

  const navigation = useNavigation();

  const nextQuestion = () => {
    setQuestionAnswer(null);
    fetchAndSetQuestion();
  };

  const fetchAndSetQuestion = async () => {
    const question_result = await fetchQuestion({ quizId: quizId }); // Change IP address to your own
    if (question_result.quiz_finished) {
      navigation.navigate("End", {
        quizId: quizId,
        correct_answers_nb: question_result.correct_answers_nb,
        nb_questions_total: question_result.nb_questions_total,
      });
      return;
    }
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
        quizId: quizId,
        question_index: question.question_index,
        option_index: index,
      });
      result.user_answer_index = index;
      setQuestionAnswer(result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <View style={styleContainer.mainContainer}>
      <View>
        <HomeButton />
      </View>
      <View style={styleContainer.quizIdContainer}>
        <Text style={styleText.quizIdText}>Quiz id : {quizId}</Text>
      </View>
      <View style={styleContainer.infoContainer}>
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
