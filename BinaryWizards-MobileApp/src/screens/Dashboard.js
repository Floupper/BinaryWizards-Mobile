import { View, Text, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useCallback } from "react";
import { styleContainer } from "../styles/container";
import { getQuizzes } from "../services/userRequests";
import QuizListItem from "../components/QuizListItem";
import { styleText } from "../styles/text";

export default function Dashboard() {
  const [quizzes, setQuizzes] = useState([]);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      const fetchQuizzes = async () => {
        try {
          const value = await AsyncStorage.getItem("userToken");
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
