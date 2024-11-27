import React from "react";
import { Text, View } from "react-native";
import { styleContainer } from "../styles/container";
import IconButton from "./IconButton";
import { resetQuiz } from "../services/endScreenRequests";
import { checkGameExists } from "../services/gamesRequests";
import { useNavigation } from "@react-navigation/native";

export default function GameListItem({
  quiz_id,
  game_id,
  correct_answers_nb,
  current_question_index,
  date_game_creation,
  nb_questions_total,
}) {

  const navigation = useNavigation();

  const getPlayIcon = () => {
    if (current_question_index > nb_questions_total) {
      return "reload1";
    } else {
      return "play";
    }
  };

  const handlePress = async () => {
    if (current_question_index > nb_questions_total) {
      resetQuiz(quiz_id, navigation);
    } else {
      const response = await checkGameExists(game_id);
      if (response) {
        navigation.navigate("Questions", { gameId: game_id, question: response, quizId: response.quiz_id });
      } else {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Game does not exist",
        });
      }
    }
  }

  return (
    <View style={styleContainer.gameListItem}>
      <Text style={{ flex: 1, textAlign: "center" }}>{quiz_id}</Text>
      <Text style={{ flex: 1, textAlign: "center" }}>
        {new Date(date_game_creation).toLocaleDateString()}
      </Text>
      <Text style={{ flex: 1, textAlign: "center" }}>
        {correct_answers_nb}/{nb_questions_total}
      </Text>
      <View style={{ flex: 0.3, textAlign: "center" }}>
        <IconButton icon={getPlayIcon()} onPress={handlePress}/>
      </View>
    </View>
  );
}
