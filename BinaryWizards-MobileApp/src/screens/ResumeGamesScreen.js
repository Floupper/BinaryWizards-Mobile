import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { styleContainer } from "../styles/container";
import { checkGameExists } from "../services/gamesRequests";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import PrimaryButton from "../components/PrimaryButton";
import { styleButton } from "../styles/buttons";
import GameList from "../components/GameList";
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function JoinAndListGamesScreen() {
  const [gameId, setGameId] = useState("");
  const { navigate } = useNavigation();

  const handlePress = async () => {
    if (gameId.trim()) {
      const response = await checkGameExists(gameId);
      if (response) {
        navigate("Questions", { gameId: gameId, question: response, quizId: response.quiz_id });
      } else {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Game does not exist",
        });
      }
    } else {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please enter a quiz code",
      });
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <View style={styleContainer.container}>
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Text style={styles.label}>Game Code</Text>
          <TextInput
            style={styles.input}
            onChangeText={setGameId}
            placeholder="Enter the game code"
            value={gameId}
          />
          <PrimaryButton
            text="Join"
            onPress={handlePress}
            style={styleButton.button}
          />
        </View>
        <View style={{ width: "100%", flex: 1 }}>
          <GameList />
        </View>
      </View>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    width: "90%",
    margin: 12,
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 18,
    textAlign: "center",
  },
  icon: {
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    paddingHorizontal: 10,
  },
});
