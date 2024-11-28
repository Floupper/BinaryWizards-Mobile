import React, { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { styleInput } from "../styles/input";
import { styleContainer } from "../styles/container";
import PrimaryButton from "../components/PrimaryButton";
import { styleButton } from "../styles/buttons";
import Toast from "react-native-toast-message";
import {
  createUser,
  checkUsernameAvailability,
} from "../services/SignUpRequests";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

import { signIngBackgroundColors, stylesSignin } from "../styles/signin";
import SigninSvg from "../../assets/signin.svg";
import { LinearGradient } from "expo-linear-gradient";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(null);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const navigation = useNavigation();

  const fetchUsernameAvailability = async () => {
    try {
      const available = await checkUsernameAvailability({ username });
      setIsUsernameAvailable(available);
      setUsernameError(!available);

      setUsername(username);
    } catch (error) {
      setUsernameError(true);
      console.error("Error checking username:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "An error occured while checking the username",
      });
      throw error;
    }
  };

  const handlePress = async () => {
    if (password.length < 8) {
      setPasswordError(true);
    }

    if (password === confirmPassword) {
      try {
        const response = await createUser({ username, password });
        if (response) {
          AsyncStorage.setItem("userToken", response.token);
          navigation.navigate("Signin");
          Toast.show({
            type: "success",
            text1: "Success",
            text2: "User created successfully.",
          });
        }
      } catch (error) {
        setConfirmPasswordError(true);
        console.error("Error creating user:", error);
      }
    } else {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Passwords do not match.",
      });
    }
  };

  return (
    <View style={styleContainer.container}>
      <LinearGradient
        colors={signIngBackgroundColors}
        style={styleContainer.container}
      >
        <View style={stylesSignin.inputsContainer}>
          <SigninSvg style={{ width: "20%", height: "20%" }} />
          <View style={styleContainer.contentContainer}>
            <View style={{ textAlign: "left" }}>
              <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                Welcome to Quiz App
              </Text>
              <Text
                style={{ color: "gray", fontWeight: "600", marginBottom: 15 }}
              >
                Please sign up below.
              </Text>
            </View>
            <View style={{ marginBottom: 15 }}>
              <Text style={stylesSignin.inputLabel}>Username</Text>
              <TextInput
                style={[
                  styleInput.input,
                  usernameError && { borderColor: "red" },
                ]}
                value={username}
                onChangeText={(text) => {
                  setUsername(text);
                  setUsernameError(false);
                }}
                onBlur={fetchUsernameAvailability}
              />
              {isUsernameAvailable === false && (
                <Text style={{ color: "red" }}>Username is already taken.</Text>
              )}
              {isUsernameAvailable === true && (
                <Text style={{ color: "green" }}>Username is available!</Text>
              )}
            </View>
            <View style={{ marginBottom: 15 }}>
              <Text style={stylesSignin.inputLabel}>Password</Text>
              <TextInput
                style={[
                  styleInput.input,
                  passwordError && { borderColor: "red" },
                ]}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  setPasswordError(false);
                }}
                onBlur={() => {
                  if (password.length < 8) {
                    setPasswordError(true);
                  }
                }}
              />
              {password.length < 8 && password.length > 0 && (
                <Text style={{ color: "red" }}>
                  Password must be at least 8 characters long.
                </Text>
              )}
            </View>
            <View style={{ marginBottom: 15 }}>
              <Text style={stylesSignin.inputLabel}>Confirm Password</Text>
              <TextInput
                style={[
                  styleInput.input,
                  confirmPasswordError && { borderColor: "red" },
                ]}
                placeholder="Confirm Password"
                secureTextEntry
                value={confirmPassword}
                onChangeText={(text) => {
                  setConfirmPassword(text);
                  setConfirmPasswordError(false);
                }}
                onBlur={() => {
                  if (password !== confirmPassword) {
                    setConfirmPasswordError(true);
                  }
                }}
              />
              {password !== confirmPassword && confirmPassword.length > 0 && (
                <Text style={{ color: "red" }}>Passwords do not match.</Text>
              )}
            </View>
            <PrimaryButton
              text="Sign up"
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
          <View style={[stylesSignin.line, { marginRight: 10 }]} />
          <Text>OR</Text>
          <View style={[stylesSignin.line, { marginLeft: 10 }]} />
        </View>
        <Pressable onPress={() => navigation.navigate("Signin")}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Text style={stylesSignin.navigateSignup}>Sign in</Text>
          </View>
        </Pressable>
      </LinearGradient>
    </View>
  );
}
