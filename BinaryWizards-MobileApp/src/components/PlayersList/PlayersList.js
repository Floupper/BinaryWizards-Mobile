import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { io } from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View } from 'react-native';

import { styles } from './PlayersListStyle';
import { REACT_NATIVE_API_URL, REACT_NATIVE_API_PORT } from '@env';
import axiosInstance from '../../utils/axiosInstance';

const SERVER_URL = `${REACT_NATIVE_API_URL}:${REACT_NATIVE_API_PORT}`;

export default function PlayersList({ game_id, game_mode }) {
  const [players, setPlayers] = useState([]);
  const [socket, setSocket] = useState(null);
  const [teamName, setTeamName] = useState([]);

  useEffect(() => {
    const getTeamsNames = async () => {
      try {
        const response = await axiosInstance.get(`/game/${game_id}/get_teams`);

        if (response.status === 200) {
          const teams = response.data.teams;
          setTeamName(teams);
        } else {
          console.error('Erreur lors de la récupération des noms des équipes');
        }
      } catch (error) {
        console.error(
          'Erreur lors de la récupération des noms des équipes :',
          error
        );
      }
    };

    getTeamsNames();
  }, [game_id]);

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
          newSocket.emit('joinGame', { game_id, teamName: 'team de bogoss' });
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
      {game_mode === 'team'
        ? teamName.map((team, index) => (
            <TouchableOpacity key={index}>
              <Text style={styles.username}>{team}</Text>
            </TouchableOpacity>
          ))
        : players.map((player, index) => (
            <Text style={styles.username} key={index}>
              {player}
            </Text>
          ))}
    </View>
  );
}
