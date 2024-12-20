/* eslint-disable prettier/prettier */
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import * as Font from 'expo-font';

import StackNavigator from './src/navigation/StackNavigator';

export default function App() {
  const [fontsLoaded] = Font.useFonts({
    Mogula: require('./assets/fonts/mogula.otf'),
  });

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StackNavigator />
        <Toast />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
