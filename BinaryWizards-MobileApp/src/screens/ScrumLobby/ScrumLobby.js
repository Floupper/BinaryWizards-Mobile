import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import ShareModal from '../../components/ShareModal/ShareModal';
import PlayersList from '../../components/PlayersList/PlayersList';
import { styles } from './ScrumLobbyStyle';

export default function ScrumLobby({ route }) {
  const [gameId, setGameId] = useState(route.params.gameId);
  const [gameMode, setGameMode] = useState(route.params.gameMode);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Players List</Text>
        <PlayersList
          style={styles.playersList}
          game_id={gameId}
          game_mode={gameMode}
        />

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
    </>
  );
}
