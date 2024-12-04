import Toast from "react-native-toast-message";
import axiosInstance from "../utils/axiosInstance";

export async function checkGameExists(gameId) {
  try {
    const response = await axiosInstance.get(`/game/${gameId}/question`);

    if (!response) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.data;
    return data;

  } catch (error) {
    console.error("Error fetching game data:", error);
    Toast.show({
      type: "error",
      text1: "Error",
      text2: "Game does not exist",
    });
    return null;
  }
}

export async function createGame(quizId) {
  try {
    const response = await axiosInstance.get(`/game/${quizId}/create`);

    if (!response) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.data;
    return data;
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: 'An error occured while creating the game',
    });
    console.error("Error creating game:", error);
    Toast.show({
      type: "error",
      text1: "Error",
      text2: "An error occured while creating the game",
    });
    return null;
  }
}