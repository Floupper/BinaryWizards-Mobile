import React from 'react';
import { ImageBackground, Pressable, Text, View } from 'react-native';
import { styles } from './UserHomeScreenStyles';
import background from '../../../assets/backgrounds/mainBackground.png';
import TopBar from '../../components/TopBar/TopBar';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function UserHomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Play Game</Text>
      <Pressable
        onPress={() => navigation.navigate('HomeSingleplayer')}
        style={({ pressed }) => [
          styles.categoryContainer,
          {
            backgroundColor: pressed ? 'rgb(250, 250, 250)' : 'white',
            shadowColor: pressed && 'orange',
          },
        ]}
      >
        <Text style={styles.emoji}>😁</Text>
        <Text style={styles.text}>Singleplayer</Text>
      </Pressable>
      <Pressable
        onPress={() => navigation.navigate('HomeMultiPlayer')}
        style={({ pressed }) => [
          styles.categoryContainer,
          {
            backgroundColor: pressed ? 'rgb(250, 250, 250)' : 'white',
            shadowColor: pressed && 'green',
          },
        ]}
      >
        <Text style={styles.emoji}>😁😆</Text>
        <Text style={styles.text}>Multiplayer</Text>
      </Pressable>
    </View>
  );
}
