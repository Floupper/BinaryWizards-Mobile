import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import userTokenEmitter from '../utils/eventEmitter';

import { styleContainer } from '../styles/container';
import TopBar from '../components/TopBar';
import UserHomeComponent from '../components/UserHomeComponent/UserHomeComponent';
import HomeComponent from '../components/HomeComponent';
import PrimaryButton from '../components/PrimaryButton';
import { styleButton } from '../styles/buttons';
import { useNavigation } from '@react-navigation/native';

const queryClient = new QueryClient();

export default function HomeScreen() {
  const [userToken, setUserToken] = useState(null);
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

  return (
    <QueryClientProvider client={queryClient}>
      <View style={styleContainer.mainContainer}>
        <TopBar setHomeScreenUserToken={setUserToken} />
        {userToken ? (
          <View style={styleContainer.container}>
            <UserHomeComponent />
            <View style={styleContainer.divider} />
            <PrimaryButton
              isQuestion={false}
              text="Create quiz"
              onPress={() => navigation.navigate('Create')}
              style={styleButton.enabledButton}
            />
          </View>
        ) : (
          <View style={styleContainer.container}>
            <HomeComponent />
          </View>
        )}
      </View>
    </QueryClientProvider>
  );
}
