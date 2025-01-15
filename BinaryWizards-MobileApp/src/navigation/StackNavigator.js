import React from 'react';
import { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AnonymousHomeScreen from '../screens/AnonymousHomeScreen/AnonymousHomeScreen';
import QuestionScreen from '../screens/Questions/QuestionsScreen';
import EndScreen from '../screens/EndScreen/EndScreen';
import CreateGame from '../screens/CreateGame/CreateGame';
import Signup from '../screens/Signup';
import Signin from '../screens/Signin';
import TeamLobby from '../screens/TeamLobby/TeamLobby';
import ScrumLobby from '../screens/ScrumLobby/ScrumLobby';
import ScrumQuestionScreen from '../screens/ScrumQuestionScreen/ScrumQuestionScreen';
import ScrumEndScreen from '../screens/ScrumEndScreen/ScrumEndScreen';
import { NavigationContainer } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import SetGameMode from '../components/SetGameMode/SetGameMode';
import TeamQuestionScreen from '../screens/TeamQuestionScreen/TeamQuestionScreen';
import TeamEndScreen from '../screens/TeamEndScreen/TeamEndScreen';
import UserHomeScreen from '../screens/UserHomeScreen/UserHomeScreen';
import SinglePlayerScreen from '../screens/SinglePlayerScreen/SinglePlayerScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';

const prefix = Linking.createURL('/');

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  const [data, setData] = useState(null);

  const linking = {
    prefixes: [prefix],
    config: {
      screens: {
        SetGameMode: 'game/join/:gameId/',
      },
    },
  };

  function handleDeepLink(event) {
    let data = Linking.parse(event.url);
    setData(data);
  }

  // useEffect(() => {
  //   async function getInitialURL() {
  //     const initialURL = await Linking.getInitialURL();
  //     if (initialURL) {
  //       let data = Linking.parse(initialURL);
  //       setData(data);
  //     }
  //   }
  //   Linking.addEventListener('url', handleDeepLink);
  //   if (!data) {
  //     getInitialURL();
  //   }
  //   return () => {
  //     Linking.removeEventListener('url');
  //   };
  // }, []);

  return (
    <>
      <NavigationContainer linking={linking}>
        {/* Define the stack navigator */}
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false, title: 'Home' }}
          />

          <Stack.Screen
            name="Create"
            component={CreateGame}
            options={{ headerShown: false, title: 'Create a game' }}
          />

          <Stack.Screen
            name="Questions"
            component={QuestionScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="SetGameMode"
            component={SetGameMode}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="End"
            component={EndScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{ headerShown: false, title: 'Sign Up' }}
          />

          <Stack.Screen
            name="Signin"
            component={Signin}
            options={{ headerShown: false, title: 'Sign In' }}
          />

          <Stack.Screen
            name="ScrumLobby"
            component={ScrumLobby}
            options={{ headerShown: false, title: 'Scrum Lobby' }}
          />

          <Stack.Screen
            name="ScrumQuestionScreen"
            component={ScrumQuestionScreen}
            options={{ headerShown: false, title: 'Team Question Screen' }}
          />

          <Stack.Screen
            name="ScrumEndScreen"
            component={ScrumEndScreen}
            options={{ headerShown: false, title: 'Team End Screen' }}
          />

          <Stack.Screen
            name="TeamLobby"
            component={TeamLobby}
            options={{ headerShown: false, title: 'Team Lobby' }}
          />

          <Stack.Screen
            name="TeamQuestionScreen"
            component={TeamQuestionScreen}
            options={{ headerShown: false, title: 'Team Question Screen' }}
          />

          <Stack.Screen
            name="TeamEndScreen"
            component={TeamEndScreen}
            options={{ headerShown: false, title: 'Team End Screen' }}
          />

          <Stack.Screen
            name="UserHome"
            component={UserHomeScreen}
            options={{ headerShown: false, title: 'User Home' }}
          />

          <Stack.Screen
            name="HomeSingleplayer"
            component={SinglePlayerScreen}
            options={{ headerShown: false, title: 'Home Singleplayer' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
