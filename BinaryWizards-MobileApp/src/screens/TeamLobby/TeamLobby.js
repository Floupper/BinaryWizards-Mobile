import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { io } from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

import ShareModal from '../../components/ShareModal/ShareModal';
import PlayersList from '../../components/PlayersList/PlayersList';
import { REACT_NATIVE_API_URL, REACT_NATIVE_API_PORT } from '@env';

const SERVER_URL = `${REACT_NATIVE_API_URL}:${REACT_NATIVE_API_PORT}`;

export default function TeamLobby({ route }) {
  const [gameId, setGameId] = useState(route.params.teamCode);
  const [gameMode, setGameMode] = useState(route.params.gameMode);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const navigation = useNavigation();

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  useEffect(() => {
    const startGame = async () => {
      try {
        const userToken = await AsyncStorage.getItem('userToken');

        const newSocket = io(SERVER_URL, {
          transports: ['websocket'],
          extraHeaders: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        newSocket.on('gameStarted', () => {
          navigation.navigate('Questions', { gameId });
        });

        newSocket.on('disconnect', () => {
          console.log('Disconnected from WebSocket server');
        });

        setSocket(newSocket);
      } catch (error) {
        console.error('Error during connecting to websocket :', error);
      }
    };

    startGame();
  }, [gameId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Players List</Text>
      <PlayersList game_id={gameId} game_mode={gameMode} />

      <TouchableOpacity onPress={toggleModal} style={styles.shareButton}>
        <Text style={styles.shareButtonText}>Show share link</Text>
        <Feather name="eye" size={20} color="#fff" />
      </TouchableOpacity>
      <ShareModal
        visible={isModalVisible}
        toggleModal={toggleModal}
        gameId={gameId}
      />
    </View>
  );
}
