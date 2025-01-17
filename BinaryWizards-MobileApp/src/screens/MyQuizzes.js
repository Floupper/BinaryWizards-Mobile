import { View, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import React, { useState, useCallback } from 'react';
import { styleContainer } from '../styles/container';
import { getQuizzes } from '../services/userRequests';
import QuizListItem from '../components/QuizListItem/QuizListItem';
import { styleText } from '../styles/text';
import Toast from 'react-native-toast-message';
import { _retrieveUserToken, logout } from '../utils/asyncStorage';

export default function MyQuizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      const fetchQuizzes = async (navigation) => {
        try {
          const value = await _retrieveUserToken(navigation);
          if (!value) {
            logout(navigation);
          }

          const fetchedQuizzes = await getQuizzes(navigation);
          if (fetchedQuizzes) {
            setQuizzes(fetchedQuizzes);
          } else {
            setQuizzes([]);
            logout(navigation);
          }
        } catch (error) {
          console.error('Error fetching quizzes or refreshing token:', error);
          Toast.show({
            type: 'error',
            text1: 'Error fetching quizzes',
            text2: 'Please try again',
          });
        }
      };

      fetchQuizzes(navigation);
    }, [])
  );

  return (
    <View style={styleContainer.mainContainer}>
      <Text style={styleText.title}>My Quizzes</Text>
      <ScrollView style={styleContainer.scrollView}>
        {quizzes.length > 0 ? (
          quizzes.map((quiz, index) => (
            <QuizListItem
              key={index}
              id={quiz.id}
              difficulty={quiz.difficulty}
              title={quiz.title}
              data={quiz.date_game_creation}
            />
          ))
        ) : (
          <Text>No quizzes created yet.</Text>
        )}
      </ScrollView>
    </View>
  );
}
