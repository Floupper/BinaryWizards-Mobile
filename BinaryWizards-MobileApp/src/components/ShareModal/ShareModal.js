import React, { useState } from 'react';
import { View, Text, Modal, Button } from 'react-native';

import { styles } from './ShareModelStyle';

export default function ShareModal({ visible, toggleModal }) {
  const [link, setLink] = useState('');
  const [qrCode, setQrCode] = useState('');

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
          <Text>Link: Your shared link goes here</Text>
          <Text>QrCode: Your QR code goes here</Text>
          <Button title="Close" onPress={toggleModal} color={'black'} />
        </View>
      </View>
    </Modal>
  );
}
