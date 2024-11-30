import React, { useState } from 'react';
import { View } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { styleContainer } from '../styles/container';
import TopBar from '../components/TopBar';
import UserHomeComponent from '../components/UserHomeComponent';
import HomeComponent from '../components/HomeComponent';

const queryClient = new QueryClient();

export default function HomeScreen() {
  const [userToken, setUserToken] = useState(null);

  return (
    <QueryClientProvider client={queryClient}>
      <View style={styleContainer.mainContainer}>
        <TopBar setHomeScreenUserToken={setUserToken} />
        {userToken ? (
          <View style={styleContainer.container}>
            <UserHomeComponent />
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
