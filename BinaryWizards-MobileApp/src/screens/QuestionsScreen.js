import React, { useEffect, useState } from "react";
import QuestionComponent from "../components/QuestionComponent";
import { Text, View, StyleSheet, Pressable } from "react-native";

const questionScreenBackgroundColor = "white";

export default function QuestionScreen({ route }) {
  const { quizId } = route.params;
  const [question, setQuestion] = useState("");
  const [questionAnswer, setQuestionAnswer] = useState(null);

  const nextQuestion = () => {
    setQuestionAnswer(null);
    fetchQuestion();
  }

  const fetchQuestion = async () => {
    return await fetch(`http://172.28.64.1:3000/quiz/${quizId}/question`) //Change ip address to your own
      .then((response) => response.json())
      .then((json) => setQuestionJson(json))
      .catch((error) => console.error("Error:", error));
  };

  const setQuestionJson = (question_) => {
    setQuestion(question_);
  };

  useEffect(() => {
    fetchQuestion();
  }, []);

  selectedAnswer = async (answer) => {
    try {
      const response = await fetch(`http://172.28.64.1:3000/quiz/${quizId}/question`, { //Change ip address to your own
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answer: answer }),
      });
  
      const json = await response.json();
      setQuestionAnswer(json);
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
        <QuestionComponent question={question ? question : ""} selectedAnswer={selectedAnswer} correctAnswer={questionAnswer} />
      </View>
      <View>
        <Pressable style={styles.nextQuestionButton} onPress={() => nextQuestion()} disabled={questionAnswer === null}>
          <Text style={styles.textStyle}>Question suivante</Text>
        </Pressable>
      </View>
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
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  }
});
