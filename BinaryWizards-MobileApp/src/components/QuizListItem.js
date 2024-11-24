import React from "react";
import { Text, View } from "react-native";
import { styleContainer } from "../styles/container";
import { styleText } from "../styles/text";

export default function QuizListItem({
  id,
  difficulty,
  nb_questions,
  nb_played,
  average_score,
}) {
  return (
    <View style={styleContainer.quizListItem}>
      <View style={styleContainer.quizListItemRow}>
        <Text style={styleText.gameListItemText}>{id}</Text>
        <Text style={styleText.gameListItemText}>{difficulty}</Text>
        <Text style={styleText.gameListItemText}>Number of questions : {nb_questions}</Text>
      </View>
      <View style={styleContainer.quizListItemRow}>
        <Text style={styleText.gameListItemText}>Average score : {average_score}</Text>
        <Text style={styleText.gameListItemText}>Times played : {nb_played}</Text>
      </View>
    </View>
  );
}
