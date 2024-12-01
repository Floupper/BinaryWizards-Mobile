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
      <Text style={styleText.title}>Quiz id</Text>
      <ResumeGame />
      <PrimaryButton
        text="Create quiz"
        onPress={() => navigation.navigate('Create')}
        style={styleButton.button}
      />
    </View>
  );
}
