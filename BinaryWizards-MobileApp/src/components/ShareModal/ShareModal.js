import React, { useState, useEffect } from 'react';
import { View, Text, Modal, Button } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

import { styles } from './ShareModelStyle';
import { REACT_NATIVE_API_URL, REACT_NATIVE_API_PORT } from '@env';

export default function ShareModal({ visible, toggleModal, gameId }) {
  const [link, setLink] = useState('');
  const [qrCode, setQrCode] = useState('');

  useEffect(() => {
    setLink(
      `${process.env.REACT_NATIVE_API_URL}:${REACT_NATIVE_API_PORT}/join/${gameId}`
    );
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
          <Text style={styles.modalTitle}>Share Options</Text>
          <Text>Link: {link}</Text>
          <View style={{ marginVertical: 15 }}>
            <QRCode value={link} />
          </View>
          <Button title="Close" onPress={toggleModal} color={'black'} />
        </View>
      </View>
    </Modal>
  );
}
