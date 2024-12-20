import React, { useState, useEffect } from 'react';
import {
  View,
  Dimensions,
  StatusBar,
  ImageBackground,
  Text,
} from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import userTokenEmitter from '../../utils/eventEmitter';

import { styleContainer } from '../../styles/container';
import TopBar from '../../components/TopBar';
import UserHomeComponent from '../../components/UserHomeComponent/UserHomeComponent';
import { styleButton } from '../../styles/buttons';
import { styles } from './homeScreenStyles';
import { useNavigation } from '@react-navigation/native';
import background from '../../../assets/mainBackground.png';
import ResumeGame from '../../components/ResumeGame';

const queryClient = new QueryClient();

export default function HomeScreen() {
  const [userToken, setUserToken] = useState(null);
  const [windowWidth, setWindowWidth] = useState(
    Dimensions.get('screen').width
  );
  const [windowHeight, setWindowHeight] = useState(
    Dimensions.get('screen').height
  );
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

  const updateDimensions = () => {
    const { width, height } = Dimensions.get('window');
    setWindowWidth(width);
    setWindowHeight(height);
  };

  useEffect(() => {
    updateDimensions();
    const subscription = Dimensions.addEventListener(
      'change',
      updateDimensions
    );
    return () => subscription?.remove();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar barStyle="dark-content" />
      <ImageBackground
        source={background}
        style={{ width: windowWidth, height: windowHeight }}
      >
        <View style={styles.container}>
          <View style={styles.homeButton}>
            <TopBar setHomeScreenUserToken={setUserToken} />
          </View>
          {userToken ? (
            <View style={{ flex: 1, alignItems: 'center', width: '100%' }}>
              <UserHomeComponent />
            </View>
          ) : (
            <View style={{ flex: 1, width: '100%' }}>
              <ResumeGame />
            </View>
          )}
        </View>
      </ImageBackground>
    </QueryClientProvider>
  );
}
