import React, { useState, useEffect } from 'react';
import { View, StatusBar, ImageBackground } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import userTokenEmitter from '../../utils/eventEmitter';

import TopBar from '../../components/TopBar/TopBar';
import UserHomeComponent from '../../components/UserHomeComponent/UserHomeComponent';
import { styles } from './homeScreenStyles';
import mainBackground from '../../../assets/backgrounds/mainBackground.png';
import userBackground from '../../../assets/backgrounds/userBackground.png';
import ResumeGame from '../../components/ResumeGame';

const queryClient = new QueryClient();

export default function HomeScreen() {
  const [userToken, setUserToken] = useState(null);
  const [background, setBackground] = useState(mainBackground);

  useEffect(() => {
    const listener = (newToken) => {
      setUserToken(newToken);
    };

    userTokenEmitter.on('userToken', listener);

    return () => {
      userTokenEmitter.off('userToken', listener);
    };
  }, []);

  useEffect(() => {
    setBackground(userToken ? userBackground : mainBackground);
  }, [userToken]);

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar />
      <ImageBackground
        source={background}
        style={{ width: '100%', height: '100%' }}
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
