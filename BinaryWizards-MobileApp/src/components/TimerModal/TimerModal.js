import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

import { styles } from './styles';

export default function TimerModal({ visible, handleTimerChoice, onClose }) {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={() => {
        onClose();
      }}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.closeButton}>
            <Feather
              name="x"
              size={24}
              color="#716E6E"
              onPress={() => {
                onClose();
              }}
            />
          </View>
          <Text style={styles.modalTitle}>Choose timer</Text>
          <View style={styles.optionsContainer}>
            <TouchableOpacity
              onPress={() => {
                handleTimerChoice({ timer: 'easy' });
              }}
              style={[styles.optionBase, styles.optionEasy]}
            >
              <Text>30s</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handleTimerChoice({ timer: 'medium' });
              }}
              style={[styles.optionBase, styles.optionMedium]}
            >
              <Text>15s</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handleTimerChoice({ timer: 'hard' });
              }}
              style={[styles.optionBase, styles.optionHard]}
            >
              <Text>5s</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
