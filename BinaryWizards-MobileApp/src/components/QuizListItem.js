import React from 'react';
import { Text, View } from 'react-native';
import { styleContainer } from '../styles/container';
import { styleText } from '../styles/text';

export default function QuizListItem({
  difficulty,
  title,
  nbQuestions,
  date_game_creation,
}) {
  return (
    <View style={[styleContainer.quizListItem, { backgroundColor: 'white' }]}>
      <Text style={styleText.gameListItemText}>
        {title ? title : 'No title'}
      </Text>
      <Text style={styleText.gameListItemText}>{difficulty}</Text>
      <Text style={styleText.gameListItemText}>{nbQuestions}</Text>
    </View>
  );
}
