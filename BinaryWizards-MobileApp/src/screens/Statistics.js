import { View, Text, ScrollView } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import React, { useState, useCallback } from "react";
import Toast from "react-native-toast-message";
import { styleContainer } from "../styles/container";
import { getGames } from "../services/userRequests";
import GameListItem from "../components/GameListItem";
import { _retrieveUserToken, logout } from "../utils/asyncStorage";

export default function Statistics() {
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
      <View
        style={styleContainer.gameIdContainer}
      >
        <Text>Games played</Text>
      </View>

      <View style={{ flex: 5 }}>
        <View style={styleContainer.gameListColumns}>
          <Text>Quiz Id</Text>
          <Text>Game Id</Text>
          <Text>Score</Text>
        </View>

        <ScrollView
          style={styleContainer.scrollView}
        >
          {games.length > 0 ? (
            games.map((game, index) => (
              <GameListItem
                key={index}
                quiz_id={game.quiz_id}
                game_id={game.game_id}
                correct_answers_nb={game.correct_answers_nb}
                current_question_index={game.current_question_index}
              />
            ))
          ) : (
            <Text>There are no games to resume</Text>
          )}
        </ScrollView>
      </View>
    </View>
  );
}
