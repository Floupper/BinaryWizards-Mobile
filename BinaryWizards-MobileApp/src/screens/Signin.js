import { View, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { styleInput } from "../styles/input";
import { styleContainer } from "../styles/container";
import PrimaryButton from "../components/PrimaryButton";
import { styleButton } from "../styles/buttons";
import { signIn } from "../services/userRequests";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Signin() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const handlePress = () => {const res = signIn({ username, password }).then((data) => {
      if (data) {
        AsyncStorage.setItem("userToken", data.token);
        navigation.navigate("Home");
      } else {
        setPassword("");
      }
    });

    console.log(res)
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
