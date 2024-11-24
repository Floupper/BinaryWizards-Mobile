import React from "react";
import { View, Pressable, Text } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

export default function IconButton({ onPress, color, icon, text }) {
  return (
    <View>
      <Pressable
        onPress={() => onPress()}
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: 10,
        }}
      >
        <Icon name={icon} size={30} color={color} />
        <Text>{text}</Text>
      </Pressable>
    </View>
  );
}