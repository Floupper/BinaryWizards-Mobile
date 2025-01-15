import React from 'react';
import {
  ImageBackground,
  Text,
  TextInput,
  ActivityIndicator,
  View,
} from 'react-native';
import { styles } from './MultiPlayerStyles';
import background from '../../../assets/backgrounds/multiplayerBackground.png';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PrimaryButton from '../../components/PrimaryButton';
import { useNavigation } from '@react-navigation/native';
import HomeButton from '../../components/HomeButton/HomeButton';
import Toast from 'react-native-toast-message';
import { fetchGameMode } from '../../utils/gameModeUtils';

const queryClient = new QueryClient();

export default function MultiPlayerScreen() {
  const [gameId, setGameId] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const navigation = useNavigation();

  const handlePress = async () => {
    if (gameId.trim()) {
      setIsLoading(true);
      try {
        await fetchGameMode({ navigation, gameId });
      } catch (error) {
        console.error('Error checking game existence:', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please enter a game id',
      });
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ImageBackground
        source={background}
        style={{ width: '100%', height: '100%' }}
      >
        <HomeButton text="Back" />
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <View style={{ flex: 2, justifyContent: 'center' }}>
            <Text style={styles.label}>Join Game</Text>
            <TextInput
              onChangeText={setGameId}
              placeholder="Enter a team or scrum game id"
              value={gameId}
              style={styles.input}
            />
            <PrimaryButton
              isQuestion={false}
              onPress={handlePress}
              style={styles.button}
              disabled={isLoading}
              text={isLoading ? '' : 'Play'}
            >
              {isLoading && <ActivityIndicator color="#fff" />}
            </PrimaryButton>
          </View>
        </View>
      </ImageBackground>
    </QueryClientProvider>
  );
}
