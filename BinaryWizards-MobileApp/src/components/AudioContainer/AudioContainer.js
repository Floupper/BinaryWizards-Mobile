import React, { useState } from 'react';
import { View, Pressable, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Audio } from 'expo-av';
import { styles } from './style';

AudioContainer.propTypes = {
  options: PropTypes.array.isRequired,
  onPress: PropTypes.func.isRequired,
  determineButtonStyle: PropTypes.func.isRequired,
  userAnswerIndex: PropTypes.number,
  correctAnswerIndex: PropTypes.number,
};

export default function AudioContainer({
  options,
  onPress,
  determineButtonStyle,
  userAnswerIndex,
  correctAnswerIndex,
}) {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPlayingIndex, setCurrentPlayingIndex] = useState(null);

  const playSound = async (index) => {
    try {
      if (sound) {
        await sound.unloadAsync();
        setSound(null);
        setIsPlaying(false);
      }

      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: options[index].option_content },
        { shouldPlay: true }
      );

      setSound(newSound);
      setIsPlaying(true);
      setCurrentPlayingIndex(index);

      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          setIsPlaying(false);
          setCurrentPlayingIndex(null);
        }
      });
    } catch (error) {
      console.error('Error when playing audio :', error);
    }
  };

  const stopSound = async () => {
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
      setSound(null);
      setIsPlaying(false);
      setCurrentPlayingIndex(null);
    }
  };

  return (
    <View style={styles.container}>
      {options.map(({ option_index }) => (
        <View
          key={option_index}
          style={[
            styles.audioContainer,
            determineButtonStyle({
              buttonIndex: option_index,
              userAnswerIndex,
              correctAnswerIndex,
            }),
          ]}
        >
          <Pressable
            style={[
              styles.playButton,
              currentPlayingIndex === option_index && isPlaying
                ? styles.playing
                : styles.notPlaying,
            ]}
            onPress={() => {
              if (currentPlayingIndex === option_index && isPlaying) {
                stopSound();
              } else {
                playSound(option_index);
              }
            }}
          >
            <Text style={styles.playButtonText}>
              {currentPlayingIndex === option_index && isPlaying
                ? 'Stop'
                : 'Play'}
            </Text>
          </Pressable>

          <Pressable
            key={option_index}
            style={[
              styles.answerButton,
              determineButtonStyle({
                buttonIndex: option_index,
                userAnswerIndex,
                correctAnswerIndex,
              }),
            ]}
            onPress={() => onPress(option_index)}
          >
            <Text style={styles.answerButtonText}>Select</Text>
          </Pressable>
        </View>
      ))}
    </View>
  );
}
