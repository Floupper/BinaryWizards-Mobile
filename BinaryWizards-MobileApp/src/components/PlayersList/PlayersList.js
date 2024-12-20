import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import { io } from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View } from 'react-native';

import { styles } from './PlayersListStyle';
import { REACT_NATIVE_API_URL, REACT_NATIVE_API_PORT } from '@env';

const SERVER_URL = `${REACT_NATIVE_API_URL}:${REACT_NATIVE_API_PORT}`;

export default function PlayersList({ game_id }) {
  const [players, setPlayers] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const connectAndJoinGame = async () => {
      try {
        const userToken = await AsyncStorage.getItem('userToken');

        if (socket) {
          socket.disconnect();
        }

        const newSocket = io(SERVER_URL, {
          transports: ['websocket'],
          extraHeaders: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        newSocket.on('connect', () => {
          console.log('Connecté au serveur WebSocket');
          newSocket.emit('joinGame', { game_id });
        });

        newSocket.on('playerJoined', (updatedPlayerList) => {
          setPlayers(updatedPlayerList.playerList);
        });

        newSocket.on('disconnect', () => {
          console.log('Déconnecté du serveur WebSocket');
        });

        setSocket(newSocket);
      } catch (error) {
        console.error('Erreur lors de la connexion au WebSocket :', error);
      }
    };

    connectAndJoinGame();

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [game_id]);

  return (
    <View style={styles.container}>
      {players.map((player, index) => (
        <Text style={styles.username} key={index}>
          {player}
        </Text>
      ))}
    </View>
  );
}
