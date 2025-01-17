import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
  useRef,
} from 'react';
import { Text, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';

const Chrono = forwardRef(({ timeAvailable, onTimerEnd }, ref) => {
  const [time, setTime] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (timeAvailable > 0) {
      resetTimer(timeAvailable);
      startTimer();
    }
  }, [timeAvailable]);

  const startTimer = () => {
    if (intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 5) {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }

        if (prevTime <= 1) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;

          setTimeout(() => {
            onTimerEnd(-1);
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
          }, 0);

          return 0;
        }

        return prevTime - 1;
      });
    }, 1000);
  };

  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const resetTimer = (newTime) => {
    stopTimer();
    setTime(newTime);
  };

  useImperativeHandle(ref, () => ({
    startTimer,
    stopTimer,
    resetTimer,
  }));

  const formatTime = (time) => {
    const seconds = Math.floor(time % 60);
    return `${seconds.toString()}s`;
  };

  const getComputedStyle = () => {
    if (time < 5) {
      return { ...styles.text, color: 'red' };
    }
    return styles.text;
  };

  return <Text style={getComputedStyle()}>{formatTime(time)}</Text>;
});

Chrono.displayName = 'Chrono';

const styles = StyleSheet.create({
  text: {
    color: '#8B2DF1',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Chrono;
