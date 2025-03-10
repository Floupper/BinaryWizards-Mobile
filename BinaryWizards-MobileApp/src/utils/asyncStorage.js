import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import userTokenEmitter from './eventEmitter';

// Retrieve the user token from async storage
export async function _retrieveUserToken(navigation) {
  try {
    const value = await AsyncStorage.getItem('userToken');

    return value;
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: 'An error occured while retrieving user token',
    });

    console.error('Error retrieving user token:', error);

    navigation.navigate('Home');
  }
}

// Remove the user token from async storage
export async function _removeUserToken() {
  try {
    await AsyncStorage.removeItem('userToken');
    userTokenEmitter.emit('userToken', null);
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: 'An error occured while logging out',
    });

    console.error('Error removing user token:', error);
  }
}

export async function _storeUserToken(token) {
  try {
    await AsyncStorage.setItem('userToken', token);
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: 'An error occured while storing user token',
    });

    console.error('Error storing user token:', error);
  }
}

// Logout the user by removing the user token from async storage
export const logout = async (navigation) => {
  try {
    await _removeUserToken();
    navigation.navigate('Home');
  } catch (error) {
    console.error('Error logging out:', error);

    Toast.show({
      type: 'error',
      text1: 'Error logging out',
      text2: 'Please try again',
    });
  }
};
