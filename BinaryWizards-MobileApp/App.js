import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import StackNavigator from './src/navigation/StackNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StackNavigator />
        <Toast />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
