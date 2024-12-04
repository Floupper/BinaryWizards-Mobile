import Toast from 'react-native-toast-message';
import axiosInstance from '../utils/axiosInstance';

export const fetchQuestion = async ({ gameId }) => {
  try {
    const response = await axiosInstance.get(`/game/${gameId}/question`);
    return response.data;
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: 'An error occured while fetching the question',
    });
    return null;
  }
};

export const sendAnswer = async ({ gameId, question_index, option_index }) => {
  try {
    const response = await axiosInstance.post(`/game/${gameId}/question`, {
      question_index: question_index,
      option_index: option_index,
    });

    return response.data;
  } catch (error) {
    return null;
  }
};
