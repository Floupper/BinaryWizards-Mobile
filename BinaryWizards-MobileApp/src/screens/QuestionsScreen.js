import React, { useEffect, useState } from "react";
import QuestionComponent from "../components/QuestionComponent";
import { Text, View, StyleSheet, Pressable } from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import { fetchQuestion, sendAnswer } from "../services/requests";
import { useNavigation } from "@react-navigation/native";

const questionScreenBackgroundColor = "white";

export default function QuestionScreen({ route }) {
  const { quizId } = route.params;
  const [question, setQuestion] = useState("");
  const [questionAnswer, setQuestionAnswer] = useState(null);

  const navigation = useNavigation();

  const nextQuestion = () => {
    setQuestionAnswer(null);
    fetchAndSetQuestion();
  }

  const fetchAndSetQuestion = async () => {
    const question_result = await fetchQuestion({ quizId: quizId }); // Change IP address to your own
    if(question_result.quizz_finished) {
      navigation.navigate("End", { score: question_result.score, quizId: quizId });
      return;
    }
    setQuestion(question_result);
  };

  useEffect(() => {
    fetchAndSetQuestion();
  }, []);

  onSelectedAnswer = async (index) => {
    try {
      const result = await sendAnswer({ quizId: quizId, question_index: question.question_index, option_index: index });
      setQuestionAnswer(result);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.quizIdContainer}>
        <Text style={styles.quizIdText}>Quiz id : {quizId}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text>Score : {question.score}</Text>
        <Text>
          Question : {question.question_index}/{question.nb_questions_total}
        </Text>
      </View>
      <View style={styles.contentContainer}>
        <QuestionComponent question={question ? question : ""} selectedAnswer={onSelectedAnswer} correctAnswer={questionAnswer} />
      </View>
      <PrimaryButton onPress={nextQuestion} disabled={questionAnswer === null} text={"Next question"}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: questionScreenBackgroundColor,
  },
  quizIdContainer: {
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  quizIdText: {
    textAlign: "center",
    color: "lightgray",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  nextQuestionButton: {
    backgroundColor: "#3552b0",
    padding: 10,
    margin: 10,
    borderRadius: 10,
    alignItems: "center",
  },
});
