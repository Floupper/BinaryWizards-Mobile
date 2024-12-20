import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Button, TextInput } from 'react-native';
import { checkGameExists } from '../../services/gamesRequests';
import Toast from 'react-native-toast-message';

export default function ScrumJoin() {
  const navigation = useNavigation();
  const [gameId, setGameId] = useState(null);

  const handlePress = async () => {
    if (gameId.trim()) {
      navigation.navigate('ScrumLobby', gameId);
    } else {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please enter a game code',
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Join a Scrum</Text>
      <TextInput
        style={[styles.input, { minWidth: 200 }]}
        onChangeText={setGameId}
        placeholder="Enter a game id"
        value={gameId}
      />
      <Button title="Join Scrum" onPress={handlePress} />
    </View>
  );
}
