import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { styleContainer } from '../styles/container';
import { styleText } from '../styles/text';
import PrimaryButton from '../components/PrimaryButton';
import { styleButton } from '../styles/buttons';
import TopBar from '../components/TopBar';
import SearchQuiz from '../components/SearchQuiz';

const queryClient = new QueryClient();

export default function HomeScreen() {
  const [userToken, setUserToken] = useState(null);
  const navigation = useNavigation();

  return (
    <QueryClientProvider client={queryClient}>
      <View style={styleContainer.mainContainer}>
        <TopBar setHomeScreenUserToken={setUserToken} />
        {userToken ? (
          <View style={styleContainer.container}>
            <Text style={styleText.title}>Quiz</Text>
            <PrimaryButton
              text="Resume game"
              onPress={() => navigation.navigate('ResumeGames')}
              style={styleButton.button}
            />
            <PrimaryButton
              text="Create game"
              onPress={() => navigation.navigate('Create')}
              style={styleButton.button}
            />
            <SearchQuiz />
          </View>
        ) : (
          <Text>Home Screen</Text>
        )}
      </View>
    </QueryClientProvider>
  );
}
