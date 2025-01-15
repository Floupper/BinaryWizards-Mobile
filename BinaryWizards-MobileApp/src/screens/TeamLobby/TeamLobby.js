import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import ShareModal from '../../components/ShareModal/ShareModal';
import PlayersList from '../../components/PlayersList/PlayersList';

import { styles } from './TeamLobbyStyle';

import teamBackground from '../../../assets/backgrounds/teamBackground.png';

export default function TeamLobby({ route }) {
  const [gameId, setGameId] = useState(route.params.teamCode);
  const [gameMode, setGameMode] = useState(route.params.gameMode);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <ImageBackground
      source={teamBackground}
      style={{ width: '100%', height: '100%' }}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Players List</Text>
        <PlayersList gameId={gameId} gameMode={gameMode} />

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
    </ImageBackground>
  );
}
