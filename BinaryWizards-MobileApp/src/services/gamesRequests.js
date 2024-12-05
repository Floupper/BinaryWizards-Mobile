import Toast from 'react-native-toast-message';
import axiosInstance from '../utils/axiosInstance';
import { _removeUserToken } from '../utils/asyncStorage';

export async function checkGameExists(gameId) {
  try {
    const response = await axiosInstance.get(`/game/${gameId}/question`);

    if (!response) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.data;
    return data;
  } catch (error) {
    if (error.status === 401) {
      await _removeUserToken();
      Toast.show({
        type: 'error',
        text1: 'Error while fetching game data',
        text2: 'Please login again',
      });
    }
    return null;
  }
}
