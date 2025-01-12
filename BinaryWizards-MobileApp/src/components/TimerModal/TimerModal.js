import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { timerModes } from '../../utils/timer';
import Feather from '@expo/vector-icons/Feather';

import { styles } from './styles';

export default function TimerModal({
  visible,
  handleTimerChoice,
  onClose,
  isCreateGame,
}) {
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
            {!isCreateGame && (
              <TouchableOpacity
                onPress={() => {
                  handleTimerChoice({ timer: timerModes.NONE });
                }}
                style={[styles.optionBase, styles.optionNone]}
              >
                <Text style={styles.text}>None</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={() => {
                handleTimerChoice({ timer: timerModes.EASY });
              }}
              style={[styles.optionBase, styles.optionEasy]}
            >
              <Text style={styles.text}>30s</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handleTimerChoice({ timer: timerModes.MEDIUM });
              }}
              style={[styles.optionBase, styles.optionMedium]}
            >
              <Text style={styles.text}>15s</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handleTimerChoice({ timer: timerModes.HARD });
              }}
              style={[styles.optionBase, styles.optionHard]}
            >
              <Text style={styles.text}>5s</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
