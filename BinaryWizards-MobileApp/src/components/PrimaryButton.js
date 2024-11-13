import React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { buttonStyles, styleButton } from "../styles/buttons";

export default function PrimaryButton({ onPress, disabled, text }) {
  return (
    <View>
      <Pressable
        style={styleButton.button}
        onPress={() => onPress()}
        disabled={disabled}
      >
        <Text style={styleButton.textStyle}>{text}</Text>
      </Pressable>
    </View>
  );
}