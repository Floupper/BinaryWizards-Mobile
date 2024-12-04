import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import QuestionScreen from '../screens/Questions/QuestionsScreen';
import EndScreen from '../screens/EndScreen/EndScreen';
import CreateGame from '../screens/CreateGame/CreateGame';
import ResumeGamesScreen from '../screens/ResumeGameScreen/ResumeGamesScreen';
import Signup from '../screens/Signup';
import Signin from '../screens/Signin';
import DashboardTab from './DashboardTab';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <>
      {/* Define the stack navigator */}
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false, title: 'Home' }}
        />

        <Stack.Screen
          name="ResumeGames"
          component={ResumeGamesScreen}
          options={{ headerShown: true, title: 'Resume game' }}
        />

        <Stack.Screen
          name="Create"
          component={CreateGame}
          options={{ headerShown: false, title: 'Create a game' }}
        />

        <Stack.Screen
          name="Questions"
          component={QuestionScreen}
          options={{ headerShown: true }}
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

        <Stack.Screen name="Profile" component={DashboardTab} />
      </Stack.Navigator>
    </>
  );
}
