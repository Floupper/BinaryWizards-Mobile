/* eslint-disable prettier/prettier */
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import * as Font from 'expo-font';
import { SafeAreaView, StatusBar, useColorScheme } from 'react-native';

import StackNavigator from './src/navigation/StackNavigator';

export default function App() {
  const colorScheme = useColorScheme(); // Détecte le thème clair ou sombre
  const [fontsLoaded] = Font.useFonts({
    Mogula: require('./assets/fonts/mogula.otf'),
  });

  const statusBarBackgroundColor = colorScheme === 'dark' ? '#000' : 'dark';

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{ flex: 1, backgroundColor: statusBarBackgroundColor }}
      >
        <StatusBar backgroundColor={statusBarBackgroundColor} />
        <NavigationContainer>
          <StackNavigator />
          <Toast />
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
