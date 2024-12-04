import axiosInstance from '../utils/axiosInstance';

export async function resetQuiz(quizId, navigation) {
  try {
    const response = await axiosInstance.get(`/game/${quizId}/create`);

    const data = response.data;

    navigation.navigate('Questions', { gameId: data.game_id });
  } catch (error) {
    return null;
  }
}
