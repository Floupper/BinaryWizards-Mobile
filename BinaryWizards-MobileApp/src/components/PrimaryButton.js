import React from "react";
import { View, Pressable, Text } from "react-native";
import { styleButton } from "../styles/buttons";

export default function PrimaryButton({
  onPress,
  disabled,
  text,
  style,
  isQuestion,
  children,
}) {
  return (
    <View>
      <Pressable
        style={[
          style,
          { minWidth: 200 },
          disabled ? styleButton.disabledButton : style,
        ]}
        onPress={() => onPress()}
        disabled={disabled}
      >
        {children ? (
          children
        ) : (
          <Text
            style={
              disabled
                ? styleButton.disabledText
                : isQuestion
                  ? styleButton.textStyleQuestion
                  : styleButton.textStyle
            }
          >
            {text}
          </Text>
        )}
      </Pressable>
    </View>
  );
}
