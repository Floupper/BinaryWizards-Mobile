import React from 'react';
import { Text, View, Pressable } from 'react-native';
import { styles } from './styles';

export default function QuizListItem({
  difficulty,
  title,
  nbQuestions,
  quiz_id,
  openModal,
}) {
  return (
    <View>
      <Pressable onPress={() => openModal(quiz_id)} style={styles.container}>
        <Text>{title ? title : 'No title'}</Text>
        <Text>{difficulty}</Text>
        <Text>{nbQuestions}</Text>
      </Pressable>
    </View>
  );
}
