import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View, Alert, Image } from 'react-native';
import { io } from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import user from '../../../assets/images/user.png';
import users from '../../../assets/images/users.png';

import { styles } from './PlayersListStyle';
import { REACT_NATIVE_API_URL, REACT_NATIVE_API_PORT } from '@env';
import axiosInstance from '../../utils/axiosInstance';

const SERVER_URL = `${REACT_NATIVE_API_URL}:${REACT_NATIVE_API_PORT}`;

export default function PlayersList({ gameId, gameMode }) {
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
            params: { gameId },
          });
          return;
        }

        const newSocket = io(SERVER_URL, {
          extraHeaders: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        newSocket.emit('joinGame', { game_id: gameId });

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
                    params: { gameId },
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
    console.log(players.length);

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
            `/game/${gameId}/get_teams`,
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
    }, [gameId]);
  }

  const joinTeam = async (team_name) => {
    try {
      if (socket) {
        socket.emit('joinGame', { gameId, team_name });
        setSelectedTeam(team_name);

        socket.on('gameStarted', () => {
          navigation.navigate('TeamQuestionScreen', {
            gameId: gameId,
            gameMode: gameMode,
          });
        });
      }
    } catch (error) {
      console.error('Error during joining team :', error);
    }
  };

  useEffect(() => {
    if (socket && gameMode === 'scrum') {
      socket.emit('joinGame', { gameId });

      socket.on('gameStarted', () => {
        navigation.navigate('ScrumQuestionScreen', {
          gameId: gameId,
          gameMode: gameMode,
        });
      });

      return () => {
        socket.off('gameStarted');
      };
    }
  }, [socket, gameMode]);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.top}>
        <Text style={styles.title}>Players</Text>
        {gameMode === 'team' ? (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontWeight: 'bold', paddingRight: 5 }}>
              {players.length}
            </Text>
            <Image source={users} style={styles.image} />
          </View>
        ) : (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontWeight: 'bold', paddingRight: 5 }}>
              {players.length}
            </Text>
            <Image source={user} style={styles.image} />
          </View>
        )}
      </View>
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
    </View>
  );
}
