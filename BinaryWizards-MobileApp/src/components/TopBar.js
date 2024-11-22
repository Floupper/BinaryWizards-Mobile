import React from "react";
import { View } from "react-native";
import { styleContainer } from "../styles/container";
import { styleButton } from "../styles/buttons";
import SecondaryButton from "./SecondaryButton";
import { styleText } from "../styles/text";
import { useNavigation } from "@react-navigation/native";

export default function TopBar() {
  const navigation = useNavigation();
  return (
    <View style={styleContainer.topBar}>
      <SecondaryButton
        text="Sign up"
        onPress={() => navigation.navigate("Signup")}
        style={styleButton.button}
        textStyle={styleText.topBarText}
      />
      <SecondaryButton
        text="Sign in"
        onPress={() => navigation.navigate("Signin")}
        style={styleButton.button}
        textStyle={styleText.topBarText}
      />
    </View>
  );
}
