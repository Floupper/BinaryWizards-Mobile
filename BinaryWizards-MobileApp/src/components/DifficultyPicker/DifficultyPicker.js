import React, { useState, useRef } from 'react';
import { View, Pressable, Animated } from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/AntDesign';
import * as Haptics from 'expo-haptics';

DifficultyPicker.propTypes = {
  setSelectedDifficulty: PropTypes.func.isRequired,
};

export default function DifficultyPicker({ setSelectedDifficulty }) {
  const [selectedDifficulty, setDifficulty] = useState('All');
  const rotateValue = useRef(new Animated.Value(0)).current;
  const colorValue = useRef(new Animated.Value(0)).current;

  const difficulties = ['easy', 'medium', 'hard'];

  const handlePress = (difficulty) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setDifficulty(difficulty);
    setSelectedDifficulty(difficulty);
  };

  const getStarColor = (difficultyIndex) => {
    if (!selectedDifficulty) return 'white';

    const currentIndex = difficulties.indexOf(selectedDifficulty);
    return difficultyIndex <= currentIndex ? '#FFD700' : 'white';
  };

  const resetDifficulty = () => {
    const difficulty = 'All';
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Hard);

    Animated.parallel([
      Animated.sequence([
        Animated.timing(colorValue, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(colorValue, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
      ]),
      Animated.sequence([
        Animated.timing(rotateValue, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(rotateValue, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
      ]),
    ]).start();

    setDifficulty(difficulty);
    setSelectedDifficulty(difficulty);
  };

  const backgroundColor = colorValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['white', '#d6d6d6'],
  });

  const rotateInterpolation = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-45deg'],
  });

  return (
    <View style={styles.container}>
      {difficulties.map((difficulty, index) => (
        <Pressable
          key={difficulty}
          onPress={() => handlePress(difficulty)}
          style={styles.starContainer}
        >
          <Icon name="star" size={30} color={getStarColor(index)} />
        </Pressable>
      ))}
      <Pressable onPress={resetDifficulty} style={styles.resetButton}>
        <Animated.View
          style={[
            styles.resetButtonBackground,
            { backgroundColor, transform: [{ rotate: rotateInterpolation }] },
          ]}
        >
          <Icon name="back" size={19} color="gray" />
        </Animated.View>
      </Pressable>
    </View>
  );
}
