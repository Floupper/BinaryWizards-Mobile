import React, { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import StackNavigator from './src/navigation/StackNavigator';

export default function App() {
  return (
    <>
      <SafeAreaProvider>
        <StackNavigator />
        <Toast />
      </SafeAreaProvider>
    </>
  );
}
