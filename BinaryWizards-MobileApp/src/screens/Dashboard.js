import { View, Text, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
import React, { useState, useCallback } from "react";
import { styleContainer } from "../styles/container";
import { getQuizzes } from "../services/userRequests";
import QuizListItem from "../components/QuizListItem";
import { styleText } from "../styles/text";
import Toast from "react-native-toast-message";
import { _retrieveUserToken } from "../utils/asyncStorage";

export default function Dashboard() {
  const [quizzes, setQuizzes] = useState([]);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      const fetchQuizzes = async () => {
        try {
          const value = await _retrieveUserToken();
          if (!value) {
            navigation.navigate("Home");
            return;
          }

          const fetchedQuizzes = await getQuizzes();
          if (fetchedQuizzes) {
            setQuizzes(fetchedQuizzes);
          } else {
            setQuizzes([]);
          }
        } catch (error) {
          console.error("Error fetching quizzes or refreshing token:", error);
          Toast.show({
            type: "error",
            text1: "Error fetching quizzes",
            text2: "Please try again",
          });
        }
      };

      fetchQuizzes();
    }, [])
  );

  return (
    <View style={styleContainer.mainContainer}>
      <Text style={styleText.title}>
        My Quizzes
      </Text>
      <ScrollView style={styleContainer.scrollView}>
        {quizzes.length > 0 ? (
          quizzes.map((quiz, index) => (
            <QuizListItem key={index} id={quiz.id} difficulty={quiz.difficulty} nb_questions={quiz.nb_questions} average_score={quiz.average_score} nb_played={quiz.nb_played} />
          ))
        ) : (
          <Text>No quizzes created yet.</Text>
        )}
      </ScrollView>
    </View>
  );
}
