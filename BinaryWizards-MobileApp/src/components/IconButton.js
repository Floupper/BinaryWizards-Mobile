import React from 'react';
import { View, Pressable, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function IconButton({ onPress, color, icon, text, style }) {
  return (
    <View>
      <Pressable onPress={() => onPress()} style={style}>
        <Icon name={icon} size={30} color={color} />
        <Text>{text}</Text>
      </Pressable>
    </View>
  );
}
