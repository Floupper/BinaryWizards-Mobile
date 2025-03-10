import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { checkGameExists } from '../services/gamesRequests';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import PrimaryButton from '../components/PrimaryButton';
import { styleButton } from '../styles/buttons';

export default function ResumeGame() {
  const [gameId, setGameId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const handlePress = async () => {
    if (gameId.trim()) {
      setIsLoading(true);
      try {
        const response = await checkGameExists(gameId);
        if (response) {
          setGameId('');
          navigation.navigate('Questions', {
            gameId: gameId,
            question: response,
            quizId: response.quiz_id,
          });
        } else {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Game does not exist',
          });
        }
      } catch (error) {
        console.error('Error checking game existence:', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please enter a game code',
      });
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ flex: 2, justifyContent: 'center' }}>
        <Text style={styles.label}>Resume Game</Text>
        <TextInput
          onChangeText={setGameId}
          placeholder="Enter a game id"
          value={gameId}
          style={styles.input}
        />
        <PrimaryButton
          isQuestion={false}
          onPress={handlePress}
          style={styleButton.enabledButton}
          disabled={isLoading}
          text={isLoading ? '' : 'Play'}
        >
          {isLoading && <ActivityIndicator color="#fff" />}
        </PrimaryButton>
      </View>
      <View style={{ justifyContent: 'center' }}>
        <View
          style={{ borderBottomWidth: 2, borderBottomColor: '#9d03fc' }}
        ></View>
        <PrimaryButton
          text="Quick quiz"
          onPress={() => {
            navigation.navigate('Create');
          }}
          isQuestion={false}
          style={styleButton.enabledButton}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    marginTop: 20,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 18,
    height: 50,
    margin: 12,
    textAlign: 'center',
  },
  label: {
    color: 'white',
    fontFamily: 'Mogula',
    fontSize: 40,
    marginBottom: 5,
    paddingHorizontal: 10,
  },
});
