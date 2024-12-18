import React from 'react';
import { Text, View, Pressable } from 'react-native';

export default function SecondaryButton({
  onPress,
  disabled,
  text,
  style,
  textStyle,
}) {
  return (
    <View>
      <Pressable style={style} onPress={() => onPress()} disabled={disabled}>
        <Text style={textStyle}>{text}</Text>
      </Pressable>
    </View>
  );
}
