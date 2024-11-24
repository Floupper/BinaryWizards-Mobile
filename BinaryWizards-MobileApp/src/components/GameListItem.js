import React from "react";
import { Text, View } from "react-native";
import { styleContainer } from "../styles/container";
import { styleText } from "../styles/text";

export default function GameListItem({
  quiz_id,
  game_id,
  correct_answers_nb,
  current_question_index,
}) {
  return (
    <View style={styleContainer.gameListItem}>
      <Text style={styleText.gameListItemText}>{quiz_id}</Text>
      <Text style={styleText.gameListItemText}>{game_id}</Text>
      <Text style={styleText.gameListItemText}>
        {correct_answers_nb}/{current_question_index}
      </Text>
    </View>
  );
}
