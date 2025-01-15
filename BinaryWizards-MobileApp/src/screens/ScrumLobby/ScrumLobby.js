import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import ShareModal from '../../components/ShareModal/ShareModal';
import PlayersList from '../../components/PlayersList/PlayersList';
import { styles } from './ScrumLobbyStyle';
import scrumBackground from '../../../assets/backgrounds/scrumBackground.png';

export default function ScrumLobby({ route }) {
  const { gameId, gameMode } = route.params;
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <ImageBackground
      source={scrumBackground}
      style={{ width: '100%', height: '100%' }}
    >
      <View style={styles.container}>
        <PlayersList gameId={gameId} gameMode={gameMode} />

        <TouchableOpacity onPress={toggleModal} style={styles.shareButton}>
          <Text style={styles.shareButtonText}>Show QR Code</Text>
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
