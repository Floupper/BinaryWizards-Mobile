import { View, TextInput, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { signStyles, signBackgroundColors } from "../styles/sign";
import PrimaryButton from "../components/PrimaryButton";
import { signIn } from "../services/userRequests";
import { _storeUserToken } from "../utils/asyncStorage";
import { LinearGradient } from "expo-linear-gradient";
import SigninSvg from "../../assets/signin.svg";

export default function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handlePress = async () => {
    try {
      const data = await signIn({ username, password });
      if (data) {
        _storeUserToken(data.token);
        navigation.navigate("Home");
      } else {
        setPassword("");
      }
    } catch (error) {
      console.error("Sign in error:", error);
    }
  };

  return (
    <View style={signStyles.container}>
      <LinearGradient colors={signBackgroundColors} style={signStyles.container}>
        <View style={signStyles.inputsContainer}>
          <SigninSvg style={signStyles.svgContainer} />
          <View>
            <View style={signStyles.textContainer}>
              <Text style={signStyles.title}>Welcome to Quiz App</Text>
              <Text style={signStyles.subtitle}>Please sign in below.</Text>
            </View>
            <View style={signStyles.inputContainer}>
              <Text style={signStyles.inputLabel}>Username</Text>
              <TextInput
                style={signStyles.input}
                placeholder="Username"
                onChangeText={setUsername}
                value={username}
              />
            </View>
            <View style={signStyles.inputContainer}>
              <Text style={signStyles.inputLabel}>Password</Text>
              <TextInput
                style={signStyles.input}
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={setPassword}
                value={password}
              />
            </View>
            <PrimaryButton
              text="Sign in"
              onPress={handlePress}
              style={signStyles.buttonPrimary}
            />
          </View>
        </View>
        <View style={signStyles.outerContainer}>
          <View style={[signStyles.line, { marginRight: 10 }]} />
          <Text>OR</Text>
          <View style={[signStyles.line, { marginLeft: 10 }]} />
        </View>
        <Pressable onPress={() => navigation.navigate("Signup")}>
          <View style={signStyles.leaveScreenContainer}>
            <Text style={signStyles.navigateLink}>Sign up</Text>
          </View>
        </Pressable>
      </LinearGradient>
    </View>
  );
}
