import React, { useState, useEffect } from 'react';
import { Button, Text } from 'react-native';
import { io } from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View } from 'react-native';

import { styles } from './PlayersListStyle';
import { REACT_NATIVE_API_URL, REACT_NATIVE_API_PORT } from '@env';
import axiosInstance from '../../utils/axiosInstance';

const SERVER_URL = `${REACT_NATIVE_API_URL}:${REACT_NATIVE_API_PORT}`;

export default function PlayersList() {
  const [players, setPlayers] = useState([]);
  const [socket, setSocket] = useState(null);

  const [quizId, setQuizId] = useState(null);
  const [gameId, setGameId] = useState(null);

  const createQuiz = async () => {
    try {
      const request = await axiosInstance.post('/quiz', {
        amount: 5,
        category: 15,
        difficulty: 'medium',
        title: 'test',
      });
      const quizId = request.data.quiz_id;
      setQuizId(quizId);
      console.log('Quiz ID:', quizId);
    } catch (error) {
      console.error('Error creating the quiz:', error);
    }
  };

  const initGame = async () => {
    try {
      const request = await axiosInstance.post(`/game/${quizId}/init`, {
        mode: 'scrum',
        max_players: 5,
      });
      const gameId = request.data.game_id;
      setGameId(gameId);
      console.log('Game ID:', gameId);
    } catch (error) {
      console.error('Error initializing the game:', error);
    }
  };

  const connectToSocketServer = async () => {
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
      });

      newSocket.on('playerJoined', (updatedPlayerList) => {
        setPlayers(updatedPlayerList.playerList);
        console.log('Updated player list:', updatedPlayerList.playerList);
      });

      newSocket.on('', (updatedPlayerList) => {
        setPlayers(updatedPlayerList.playerList);
        console.log('Updated player list:', updatedPlayerList.playerList);
      });

      newSocket.on('disconnect', () => {
        console.log('Déconnecté du serveur WebSocket');
      });

      setSocket(newSocket);
    } catch (error) {
      console.error('Erreur lors de la connexion au WebSocket :', error);
    }
  };

  const joinGame = async () => {
    try {
      setPlayers([]);
      socket.emit('joinGame', {
        game_id: gameId,
      });
      console.log('Joining the game with ID:', gameId);
    } catch (error) {
      console.error('Error joining the game:', error);
    }
  };

  useEffect(() => {
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [socket]);

  return (
    <View style={styles.container}>
      <Button title="Create Quiz" onPress={createQuiz} />
      <Button title="Init Game" onPress={initGame} />
      <Button title="Connect to WebSocket" onPress={connectToSocketServer} />
      <Button title="Join Game" onPress={joinGame} />
      {players.map((player, index) => (
        <Text style={styles.username} key={index}>
          {player}
        </Text>
      ))}
    </View>
  );
}
