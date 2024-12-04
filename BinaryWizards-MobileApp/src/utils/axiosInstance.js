import axios from 'axios';
import { _retrieveUserToken, logout } from './asyncStorage';
import Toast from 'react-native-toast-message';
import { REACT_NATIVE_API_URL, REACT_NATIVE_API_PORT } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { _removeUserToken } from './asyncStorage';

// Cretae an axios instance to make requests to the server
const axiosInstance = axios.create({
  baseURL: `${REACT_NATIVE_API_URL}:${REACT_NATIVE_API_PORT}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add the user token to the request headers if a user token exists
axiosInstance.interceptors.request.use(
  async (config) => {
    const userToken = await AsyncStorage.getItem('userToken'); //I don't use _retrieveUserToken() here because it's called before the user is logged in
    if (userToken) {
      config.headers['Authorization'] = `Bearer ${userToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle the response from the server
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      try {
        console.log('401');
        await _removeUserToken();
        Toast.show({
          type: 'error',
          text1: 'Invalid token',
          text2: 'Please login again',
        });
      } catch (err) {
        console.error('Error removing user token:', err);
      }
      return null;
    }

    if (error.response.status === 404) {
      try {
        await _removeUserToken();
        Toast.show({
          type: 'error',
          text1: 'Request error',
          text2: error.response.data.message,
        });
      } catch (err) {
        console.error('Error removing user token:', err);
      }
      return null;
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
