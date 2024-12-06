import React from 'react';
import { Text, View } from 'react-native';
import { styleText } from '../styles/text';
import ResumeGame from './ResumeGame';

export default function HomeComponent() {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <Text style={styleText.title}>Play a game</Text>
      <ResumeGame />
    </View>
  );
}
