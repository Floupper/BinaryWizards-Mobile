import React from 'react';
import { Text, View } from 'react-native';
import PrimaryButton from './PrimaryButton';
import { styleText } from '../styles/text';
import { styleButton } from '../styles/buttons';
import { useNavigation } from '@react-navigation/native';
import ResumeGame from './ResumeGame';

export default function HomeComponent() {
  const navigation = useNavigation();

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
      <PrimaryButton
        text="Create quiz"
        onPress={() => navigation.navigate('Create')}
        style={styleButton.enabledButton}
        isQuestion={false}
      />
    </View>
  );
}
