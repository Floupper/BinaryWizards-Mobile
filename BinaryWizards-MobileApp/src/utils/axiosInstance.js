import axios from 'axios';
import { _retrieveUserToken } from './asyncStorage';
import Toast from 'react-native-toast-message';
import { REACT_NATIVE_API_URL, REACT_NATIVE_API_PORT } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

        if (response.status === 401) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Unauthorized. Please login again.',
            });
            // TODO: Add navigate to login page
            return;
        }

        return response;
    },
    (error) => {

        const message = error.response?.data?.message || error.message || 'Unknown error occurred';

        if (error.response) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: message
            });
        } else {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Network error. Please try again.',
            });
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;