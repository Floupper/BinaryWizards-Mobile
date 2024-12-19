import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import { io } from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View } from 'react-native';

import { styles } from './PlayersListStyle';
import { REACT_NATIVE_SOCKET_SERVER_URL } from '@env';

const SERVER_URL = REACT_NATIVE_SOCKET_SERVER_URL;

export default function PlayersList() {
  const [players, setPlayers] = useState([
    { user_id: 1, username: 'mathieu' },
    { user_id: 2, username: 'julien' },
    { user_id: 3, username: 'fred' },
    { user_id: 4, username: 'sylvain' },
  ]);

  useEffect(() => {
    const userToken = AsyncStorage.getItem('userToken');

    const socket = io(SERVER_URL, {
      transports: ['websocket'],
      extraHeaders: {
        Authorization: `Bearer ${userToken}`,
      },
    });

    socket.on('connect', () => {
      console.log('Connecté au serveur WebSocket');
    });

    socket.on('playerJoined', (data) => {
      setPlayers(data);
      console.log('player joined the game:', data);
    });

    socket.on('disconnect', () => {
      console.log('Déconnecté du serveur WebSocket');
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <View style={styles.container}>
      {players.map((player) => (
        <Text style={styles.username} key={player.user_id}>
          {player.username}
        </Text>
      ))}
    </View>
  );
}
