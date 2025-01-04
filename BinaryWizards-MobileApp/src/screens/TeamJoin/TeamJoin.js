import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export default function TeamJoin() {
  const [teamCode, setTeamCode] = useState('');
  const [gameMode, setGameMode] = useState('team');
  const navigation = useNavigation();
  const handleJoin = () => {
    navigation.navigate('TeamLobby', { teamCode, gameMode });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Join a team</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter team code"
        onChangeText={setTeamCode}
        value={teamCode}
      />
      <Button title="Join" onPress={handleJoin} />
    </View>
  );
}
