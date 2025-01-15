import React, { useCallback, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Pressable } from 'react-native';
import { styleContainer } from '../../styles/container';
import { styleButton } from '../../styles/buttons';
import SecondaryButton from '../SecondaryButton';
import { styleText } from '../../styles/text';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { _retrieveUserToken } from '../../utils/asyncStorage';
import IconButton from '../IconButton';
import { logout } from '../../utils/asyncStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userTokenEmitter from '../../utils/eventEmitter';
import Icon from 'react-native-vector-icons/FontAwesome';
import { styles } from './styles';

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
          <View style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon
                name="user-circle"
                size={30}
                color="black"
                style={{ marginRight: 10 }}
              />
              <Text
                style={[styles.topBarText, { fontSize: 20, color: 'black' }]}
              >
                Hey {username} 👋
              </Text>
            </View>
            <Pressable onPress={handlePress} style={styles.topBar}>
              <Text style={styles.topBarText}>Sign Out</Text>
            </Pressable>
          </View>
        </>
      ) : (
        <>
          <SecondaryButton
            text="Sign In"
            onPress={() => navigation.navigate('Signin')}
            style={styleButton.enabledButton}
            textStyle={styles.topBarText}
          />
        </>
      )}
    </View>
  );
}
