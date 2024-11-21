import Toast from "react-native-toast-message";

export async function checkGameExists(gameId) {
  try {
    const response = await fetch(`${process.env.REACT_NATIVE_API_URL}:${process.env.REACT_NATIVE_API_PORT}/game/${gameId}/question`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const res = await response.json();
    return res;
    
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
    const response = await fetch(
      `${process.env.REACT_NATIVE_API_URL}:${process.env.REACT_NATIVE_API_PORT}/game/${quizId}/create`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: 'An error occured while creating the game',
    });
    console.error("Error creating game:", error);
    return null;
  }
}