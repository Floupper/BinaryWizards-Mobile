import React, { useState, useEffect, useRef } from 'react';
import { Text, TouchableOpacity, View, Alert } from 'react-native';
import { io } from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import { styles } from './PlayersListStyle';
import { REACT_NATIVE_API_URL, REACT_NATIVE_API_PORT } from '@env';
import axiosInstance from '../../utils/axiosInstance';

const SERVER_URL = `${REACT_NATIVE_API_URL}:${REACT_NATIVE_API_PORT}`;

export default function PlayersList({ game_id, game_mode }) {
  const [gameId, setGameId] = useState(game_id);
  const [gameMode, setGameMode] = useState(game_mode);
  const [players, setPlayers] = useState([]);
  const [socket, setSocket] = useState(null);
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const connectAndJoinGame = async () => {
      try {
        const userToken = await AsyncStorage.getItem('userToken');

        if (!userToken) {
          // Redirect if no token is found
          navigation.navigate('Signin', {
            redirectTo: 'TeamLobby',
            params: { game_id },
          });
          return;
        }

        const newSocket = io(SERVER_URL, {
          transports: ['websocket'],
          extraHeaders: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        newSocket.emit('joinGame', { game_id: game_id });

        newSocket.on('playerJoined', (updatedPlayerList) => {
          setPlayers(updatedPlayerList.playerList);
        });

        newSocket.on('disconnect', () => {
          console.log('Disconnected from WebSocket server');
        });

        newSocket.on('connect_error', (error) => {
          console.error('Connection error:', error);
          Alert.alert(
            'Connection Error',
            'Failed to connect. Please log in again.',
            [
              {
                text: 'Go to Login',
                onPress: () =>
                  navigation.navigate('Signin', {
                    redirectTo: 'TeamLobby',
                    params: { game_id },
                  }),
              },
            ]
          );
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
  }, [gameId]);

  if (gameMode === 'team') {
    useEffect(() => {
      const getTeamsNames = async () => {
        try {
          const response = await axiosInstance.get(
            `/game/${game_id}/get_teams`,
            {
              headers: {
                'Cache-Control': 'no-cache',
              },
            }
          );

          if (response.status === 200) {
            setTeams(response.data.teams);
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
  }

  const joinTeam = async (team_name) => {
    try {
      if (socket) {
        socket.emit('joinGame', { game_id, team_name });
        setSelectedTeam(team_name);

        socket.on('gameStarted', () => {
          console.log(game_id);
          navigation.navigate('TeamQuestionScreen', {
            gameId: game_id,
            gameMode: game_mode,
          });
        });
      }
    } catch (error) {
      console.error('Error during joining team :', error);
    }
  };

  return (
    <View style={styles.container}>
      {gameMode === 'team'
        ? teams.map((team, index) => (
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
