import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import QuestionScreen from '../screens/Questions/QuestionsScreen';
import EndScreen from '../screens/EndScreen/EndScreen';
import CreateGame from '../screens/CreateGame/CreateGame';
import Signup from '../screens/Signup';
import Signin from '../screens/Signin';

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
          name="Create"
          component={CreateGame}
          options={{ headerShown: true, title: 'Create a game' }}
        />

        <Stack.Screen
          name="Questions"
          component={QuestionScreen}
          options={{ headerShown: true }}
        />

        <Stack.Screen
          name="End"
          component={EndScreen}
          options={{ headerShown: true }}
        />

        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{ headerShown: true, title: 'Sign Up' }}
        />

        <Stack.Screen
          name="Signin"
          component={Signin}
          options={{ headerShown: true, title: 'Sign In' }}
        />
      </Stack.Navigator>
    </>
  );
}
