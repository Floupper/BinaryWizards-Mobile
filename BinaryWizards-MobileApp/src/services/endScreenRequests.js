import axiosInstance from "../utils/axiosInstance";

export async function resetQuiz(quizId, navigation) {
  try {
    const response = await axiosInstance.get(`/game/${quizId}/create`);

    if (!response) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = response.data;

    navigation.navigate("Questions", { gameId: data.game_id });
  } catch (error) {
    console.error("Error resetting quiz:", error);
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: 'An error occured while resetting the quiz',
    });
  }
}