import axiosInstance from '../utils/axiosInstance';
import Toast from 'react-native-toast-message';

export async function resetQuiz(quizId, navigation) {
  try {
    const response = await axiosInstance.get(`/game/${quizId}/create`);

    const data = response.data;

    navigation.navigate('Questions', { gameId: data.game_id });
  } catch (error) {
    console.error('Error resetting quiz:', error);
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: 'An error occured while resetting the quiz',
    });
  }
}
