import React, { useState, useEffect } from 'react';
import { View, Text, Modal, Button } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

import { styles } from './ShareModelStyle';

export default function ShareModal({ visible, toggleModal, gameId }) {
  const [link, setLink] = useState('');

  useEffect(() => {
    setLink(`mogula://--/game/join/${gameId}`);
  }, [gameId]);

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={toggleModal}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={{ marginVertical: 15 }}>
            <QRCode value={link} />
          </View>
          <Button title="Close" onPress={toggleModal} color={'#8B2DF1'} />
        </View>
      </View>
    </Modal>
  );
}
