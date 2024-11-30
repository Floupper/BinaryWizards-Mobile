import React from 'react';
import { Text, View, Pressable } from 'react-native';
import { styleButton } from '../styles/buttons';

export default function PrimaryButton({
  onPress,
  disabled,
  text,
  style,
  isQuestion,
}) {
  return (
    <View>
      <Pressable
        style={[style, { minWidth: 200 }]}
        onPress={() => onPress()}
        disabled={disabled}
      >
        <Text
          style={
            isQuestion ? styleButton.textStyleQuestion : styleButton.textStyle
          }
        >
          {text}
        </Text>
      </Pressable>
    </View>
  );
}
