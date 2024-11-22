import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_NATIVE_API_URL}:${process.env.REACT_NATIVE_API_PORT}`,
    headers: {
        'Content-Type': 'application/json',
    },
});

async function _retrieveUserToken() {
    try {
        const value = await AsyncStorage.getItem('userToken');
        if (value !== null) {
            return value;
        }
    } catch (error) {
        console.error('Error retrieving user token:', error);
    }
};

axiosInstance.interceptors.request.use(
    async (config) => {
        const userToken = await _retrieveUserToken();
        if (userToken) {
            config.headers['Authorization'] = `Bearer ${userToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

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