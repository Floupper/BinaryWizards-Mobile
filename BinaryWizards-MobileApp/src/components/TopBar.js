import React, { useCallback, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { styleContainer } from '../styles/container';
import { styleButton } from '../styles/buttons';
import SecondaryButton from './SecondaryButton';
import { styleText } from '../styles/text';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { _retrieveUserToken } from '../utils/asyncStorage';
import IconButton from './IconButton';
import { logout } from '../utils/asyncStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userTokenEmitter from '../utils/eventEmitter';

export default function TopBar({ setHomeScreenUserToken }) {
  const [userToken, setUserToken] = useState(null);
  const [username, setUsername] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const listener = (newToken) => {
      setUserToken(newToken);
    };

    userTokenEmitter.on('userToken', listener);

    return () => {
      userTokenEmitter.off('userToken', listener);
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      const refreshToken = async () => {
        try {
          const value = await _retrieveUserToken(navigation);
          if (!value) {
            setUserToken(null);
            setUsername(null);
            setHomeScreenUserToken(null);
            logout(navigation);
            return;
          }
          setUserToken(value);
          setHomeScreenUserToken(value);

          const storedUsername = await AsyncStorage.getItem('username');
          setUsername(storedUsername);
        } catch (error) {
          console.error('Error refreshing token:', error);
        }
      };
      refreshToken();
    }, [setHomeScreenUserToken])
  );

  const handlePress = async () => {
    try {
      await logout(navigation);
      setUserToken(null);
      setUsername(null);
      setHomeScreenUserToken(null);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <View style={styleContainer.topBar}>
      {userToken ? (
        <>
          <View style={style.topBar}>
            <IconButton
              icon="logout"
              color="black"
              onPress={handlePress}
              text="Logout"
            />
            <View>
              <Text style={style.topBarText}>Hey👋</Text>
              <Text style={style.topBarText}>{username}</Text>
            </View>
          </View>
        </>
      ) : (
        <>
          <SecondaryButton
            text="Sign up"
            onPress={() => navigation.navigate('Signup')}
            style={styleButton.enabledButton}
            textStyle={styleText.topBarText}
          />
          <SecondaryButton
            text="Sign in"
            onPress={() => navigation.navigate('Signin')}
            style={styleButton.enabledButton}
            textStyle={styleText.topBarText}
          />
        </>
      )}
    </View>
  );
}

const style = StyleSheet.create({
  topBar: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  topBarText: {
    color: 'black',
    fontSize: 20,
    marginRight: 10,
  },
});
