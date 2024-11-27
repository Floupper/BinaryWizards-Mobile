import { View, Text, ScrollView } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import React, { useState, useCallback } from "react";
import Toast from "react-native-toast-message";
import { styleContainer } from "../styles/container";
import { getGames } from "../services/userRequests";
import GameListItem from "../components/GameListItem";
import { _retrieveUserToken, logout } from "../utils/asyncStorage";
import { styleText } from "../styles/text";

export default function GamesHistory() {
  const [games, setGames] = useState([]);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      const fetchGames = async (navigation) => {
        try {
          const value = await _retrieveUserToken(navigation);
          if (!value) {
            logout(navigation);
          }

          const fetchedGames = await getGames(navigation);
          if (fetchedGames) {
            setGames(fetchedGames);
          } else {
            setGames([]);
            logout(navigation);
          }
        } catch (error) {
          console.error("Error fetching games or refreshing token:", error);
          Toast.show({
            type: "error",
            text1: "Error fetching games",
            text2: "Please try again",
          });
        }
      };

      fetchGames(navigation);
    }, [])
  );

  return (
    <View style={styleContainer.mainContainer}>
      <Text style={styleText.title}>Games History</Text>
      <View style={styleContainer.gameListColumns}>
        <Text style={{ flex: 1, textAlign: "center" }}>Quiz Id</Text>
        <Text style={{ flex: 1, textAlign: "center" }}>Date</Text>
        <Text style={{ flex: 1, textAlign: "center" }}>Score</Text>
        <Text style={{ flex: 0.3, textAlign: "center" }}></Text>
      </View>

      <ScrollView style={styleContainer.scrollView}>
        {games.length > 0 ? (
          games.map((game, index) => (
            <GameListItem
              key={index}
              quiz_id={game.quiz_id}
              game_id={game.game_id}
              correct_answers_nb={game.correct_answers_nb}
              current_question_index={game.current_question_index}
              date_game_creation={game.date_game_creation}
              nb_questions_total={game.nb_questions_total}
            />
          ))
        ) : (
          <Text style={{ textAlign: "center", marginVertical: 20 }}>
            There are no games to resume
          </Text>
        )}
      </ScrollView>
    </View>
  );
}
