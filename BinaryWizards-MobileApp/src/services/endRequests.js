export async function resetQuiz(quizId, navigation) {
    await fetch(
      `${process.env.REACT_NATIVE_API_URL}:${process.env.REACT_NATIVE_API_PORT}/game/${quizId}/create`
    ).then(async (response) => {
      const data = await response.json();
      navigation.navigate("Questions", { gameId: data.game_id });
    });
  }