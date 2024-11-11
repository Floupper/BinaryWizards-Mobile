import React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";

export default function PrimaryButton({ onPress, disabled, text }) {
  return (
    <View>
      <Pressable
        style={styles.button}
        onPress={() => onPress()}
        disabled={disabled}
      >
        <Text style={styles.textStyle}>{text}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#3552b0",
    padding: 10,
    margin: 10,
    borderRadius: 10,
    alignItems: "center",
  },
});
