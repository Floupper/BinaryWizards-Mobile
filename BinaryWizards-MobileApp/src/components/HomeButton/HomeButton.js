import React from 'react';
import { Pressable, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { styleButton } from '../../styles/buttons';
import { styles } from './styles';

export default function HomeButton({ text }) {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => navigation.navigate('Home')}
      style={styleButton.homeButton}
    >
      <Icon name="arrowleft" size={30} color="#000" />
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
}
