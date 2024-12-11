import React from 'react';
import { Text, View } from 'react-native';
import { styleText } from '../styles/text';
import ResumeGame from './ResumeGame';

export default function HomeComponent() {
  return (
    <View style={{ flex: 1, width: '100%', alignItems: 'center' }}>
      <Text
        style={[
          styleText.title,
          { color: 'white', paddingTop: 120, marginBottom: -90, fontSize: 50 },
        ]}
      >
        Play a game
      </Text>
      <ResumeGame />
    </View>
  );
}
