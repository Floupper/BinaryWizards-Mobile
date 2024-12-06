import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { styleContainer } from '../styles/container';
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
    <View style={styleContainer.container}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={styles.label}>Game Id</Text>
        <TextInput
          style={styles.input}
          onChangeText={setGameId}
          placeholder="Enter a game id"
          value={gameId}
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

        <View style={styleContainer.divider} />
        <PrimaryButton
          text="Create quiz"
          onPress={() => {
            navigation.navigate('Create');
            console.log('Create quiz button pressed');
          }}
          style={styleButton.enabledButton}
          isQuestion={false}
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
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 18,
    height: 50,
    margin: 12,
    textAlign: 'center',
    width: '90%',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    paddingHorizontal: 10,
  },
});
