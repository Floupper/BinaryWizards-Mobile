import { View, TextInput, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { styleInput } from "../styles/input";
import { styleContainer } from "../styles/container";
import PrimaryButton from "../components/PrimaryButton";
import { signIn } from "../services/userRequests";
import { _storeUserToken } from "../utils/asyncStorage";
import { LinearGradient } from "expo-linear-gradient";
import SigninSvg from "../../assets/signin.svg";
import { signIngBackgroundColors, stylesSignin } from "../styles/signin";

export default function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const handlePress = () => {
    const res = signIn({ username, password }).then((data) => {
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
      <LinearGradient
        colors={signIngBackgroundColors}
        style={styleContainer.container}
      >
        <View
          style={stylesSignin.inputsContainer}
        >
          <SigninSvg style={{ width: "20%", height: "20%" }} />
          <View style={styleContainer.contentContainer}>
            <View style={{ textAlign: "left" }}>
              <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                Welcome to Quiz App
              </Text>
              <Text
                style={{ color: "gray", fontWeight: "600", marginBottom: 15 }}
              >
                Please sign in below.
              </Text>
            </View>
            <View style={{ marginBottom: 15 }}>
              <Text style={stylesSignin.inputLabel}>Username</Text>
              <TextInput
                style={styleInput.input}
                placeholder="Username"
                onChangeText={setUsername}
                value={username}
              />
            </View>
            <View>
              <Text style={stylesSignin.inputLabel}>Password</Text>
              <TextInput
                style={styleInput.input}
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={setPassword}
                value={password}
              />
            </View>
            <PrimaryButton
              text="Sign in"
              onPress={handlePress}
              style={stylesSignin.signinButton}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            width: "40%",
          }}
        >
          <View
            style={[stylesSignin.line, { marginRight: 10 }]}
          />
          <Text>OR</Text>
          <View
            style={[stylesSignin.line, { marginLeft: 10 }]}
          />
        </View>
        <Pressable onPress={() => navigation.navigate("Signup")}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Text
              style={stylesSignin.navigateSignup}
            >
              Sign up
            </Text>
          </View>
        </Pressable>
      </LinearGradient>
    </View>
  );
}
