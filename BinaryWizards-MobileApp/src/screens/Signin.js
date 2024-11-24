import { View, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { styleInput } from "../styles/input";
import { styleContainer } from "../styles/container";
import PrimaryButton from "../components/PrimaryButton";
import { styleButton } from "../styles/buttons";
import { signIn } from "../services/userRequests";
import { _storeUserToken } from "../utils/asyncStorage";

export default function Signin() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const handlePress = () => {const res = signIn({ username, password }).then((data) => {
      if (data) {
        _storeUserToken(data.token);
        navigation.navigate("Home");
      } else {
        setPassword("");
      }
    });
  };

  return (
    <View style={styleContainer.container}>
            <TextInput
                style={styleInput.input}
                placeholder="Username"
                onChangeText={setUsername}
                value={username}
            />
            <TextInput
                style={styleInput.input}
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={setPassword}
                value={password}
            />
            <PrimaryButton
                text="Sign In"
                onPress={handlePress}
                style={styleButton.button}
            />
        </View>
  );
}
