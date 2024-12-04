import axiosInstance from '../utils/axiosInstance';
import Toast from 'react-native-toast-message';
import { _retrieveUserToken, logout } from '../utils/asyncStorage';

export const signIn = async ({ username, password }) => {
  if (!username || !password) {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: 'Please fill in all fields',
    });
    return null;
  }
  try {
    const response = await axiosInstance.post(`/user/signin`, {
      username,
      password,
    });

    if (response.status !== 200) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: response.data?.error || 'An unknown error occurred',
      });
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.data;
  } catch (error) {
    if (error.response) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.response.data?.error || 'An unknown error occurred',
      });
    } else {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.message || 'An unknown error occurred',
      });
    }

    return null;
  }
};

export const getGames = async (navigation) => {
  try {
    const userToken = await _retrieveUserToken(navigation);
    if (!userToken) {
      return null;
    }
    const response = await axiosInstance.get(`/user/played_games`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });

    if (response.status !== 200) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: response.data?.error || 'An unknown error occurred',
      });
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.data;
  } catch (error) {
    if (error.response) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.response.data?.error || 'An unknown error occurred',
      });
    } else {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.message || 'An unknown error occurred',
      });
    }

    return null;
  }
};

export const getStartedGames = async (page = 1) => {
  try {
    const params = new URLSearchParams();
    params.append('pageSize', 3);
    params.append('page', page);

    const url = `game/user/started_games?${params.toString()}`;

    const response = await axiosInstance.get(url);

    if (response.status !== 200) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: response.data?.error || 'An unknown error occurred',
      });
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.data; 
  } catch (error) {
    const errorMessage = error.response?.data?.error || error.message || 'An unknown error occurred';
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: errorMessage,
    });

    if (error.response && error.response.status === 401) {
      logout();
    }

    return null; 
  }
};
