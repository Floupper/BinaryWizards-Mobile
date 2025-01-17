import Toast from 'react-native-toast-message';
import axiosInstance from '../utils/axiosInstance';

export async function createUser({ username, password }) {
  try {
    const response = await axiosInstance.post('/user/signup', {
      username,
      password,
    });

    if (!response) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.data;
    return data;
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: 'An error occured while creating the user',
    });
    console.error('Error creating user:', error);
    return null;
  }
}

export async function checkUsernameAvailability({ username }) {
  try {
    const response = await axiosInstance.post(`/user/username_available`, {
      username,
    });

    if (!response) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.data.is_available;
    return data;
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: 'An error occured while checking the username',
    });
    console.error('Error checking username:', error);
    throw error;
  }
}
