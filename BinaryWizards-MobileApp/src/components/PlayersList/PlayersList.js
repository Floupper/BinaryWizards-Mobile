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
  const [selectedTeam, setSelectedTeam] = useState(null);

  useEffect(() => {
    const getTeamsNames = async () => {
      try {
        const response = await axiosInstance.get(`/game/${game_id}/get_teams`);

        if (response.status === 200) {
          const teams = response.data.teams;
          setTeamName(teams);
        } else {
          console.error('Error when fetching teams names');
        }
      } catch (error) {
        console.error(
          'Error when fetching teams names from the server :',
          error
        );
      }
    };

    getTeamsNames();
  }, [game_id]);

  useEffect(() => {
    const connectAndJoinGame = async (team_name) => {
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

        newSocket.on('playerJoined', (updatedPlayerList) => {
          setPlayers(updatedPlayerList.playerList);
        });

        newSocket.on('disconnect', () => {
          console.log('Disconnected from WebSocket server');
        });

        setSocket(newSocket);
      } catch (error) {
        console.error('Error during connecting to websocket :', error);
      }
    };

    connectAndJoinGame();

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [game_id]);

  const joinTeam = async (team_name) => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');

      const newSocket = io(SERVER_URL, {
        transports: ['websocket'],
        extraHeaders: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (newSocket) {
        newSocket.emit('joinGame', { game_id, team_name });
        setSelectedTeam(team_name);
      }
    } catch (error) {
      console.error('Error during joining team :', error);
    }
  };

  return (
    <View style={styles.container}>
      {game_mode === 'team'
        ? teamName.map((team, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => joinTeam(team)}
              disabled={!!selectedTeam}
              style={[
                styles.teamButton,
                selectedTeam === team && styles.selectedButton,
                !!selectedTeam &&
                  selectedTeam !== team &&
                  styles.disabledButton,
              ]}
            >
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
