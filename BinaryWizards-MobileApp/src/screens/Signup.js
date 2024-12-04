import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TextInput, Pressable, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { signStyles, signBackgroundColors } from "../styles/sign";
import { LinearGradient } from "expo-linear-gradient";
import SigninSvg from "../../assets/signin.svg";
import PrimaryButton from "../components/PrimaryButton";
import { createUser, checkUsernameAvailability } from "../services/SignUpRequests";
import Toast from "react-native-toast-message";
import debounce from "lodash.debounce";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(null);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const debouncedFetchUsernameAvailability = useCallback(
    debounce(async (text) => {
      try {
        const available = await checkUsernameAvailability({ username: text });
        setIsUsernameAvailable(available);
        setUsernameError(!available);
      } catch (error) {
        console.error("Error checking username:", error);
        setUsernameError(true);
      }
    }, 200),
    []
  );

  const handleUsernameChange = (text) => {
    setUsername(text);
    setUsernameError(false);
    setIsUsernameAvailable(null);
    debouncedFetchUsernameAvailability(text);
  };

  const handlePress = async () => {
    if (password.length < 8) {
      setPasswordError(true);
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError(true);
      return;
    }

    setIsLoading(true);

    try {
      const available = await checkUsernameAvailability({ username });
      setIsUsernameAvailable(available);
      setUsernameError(!available);

      if (!available) {
        setIsLoading(false);
        return;
      }

      const response = await createUser({ username, password });
      if (response) {
        navigation.navigate("Signin");
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "User created successfully.",
        });
      }
    } catch (error) {
      console.error("Error creating user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={signStyles.container}>
      <LinearGradient
        colors={signBackgroundColors}
        style={signStyles.container}
      >
        <View style={signStyles.inputsContainer}>
          <SigninSvg style={signStyles.svgContainer} />
          <View>
            <View style={signStyles.textContainer}>
              <Text style={signStyles.title}>Welcome to Quiz App</Text>
              <Text style={signStyles.subtitle}>Please sign up below.</Text>
            </View>
            <View style={signStyles.inputContainer}>
              <Text style={signStyles.inputLabel}>Username</Text>
              <TextInput
                style={[
                  signStyles.input,
                  usernameError && { borderColor: "red" },
                ]}
                value={username}
                onChangeText={handleUsernameChange}
              />
              {isUsernameAvailable === false && (
                <Text style={{ color: "red" }}>Username is already taken.</Text>
              )}
              {isUsernameAvailable === true && (
                <Text style={{ color: "green" }}>Username is available!</Text>
              )}
            </View>
            <View style={signStyles.inputContainer}>
              <Text style={signStyles.inputLabel}>Password</Text>
              <TextInput
                style={[
                  signStyles.input,
                  passwordError && { borderColor: "red" },
                ]}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  setPasswordError(false);
                }}
              />
              {passwordError && (
                <Text style={{ color: "red" }}>
                  Password must be at least 8 characters long.
                </Text>
              )}
            </View>
            <View style={signStyles.inputContainer}>
              <Text style={signStyles.inputLabel}>Confirm Password</Text>
              <TextInput
                style={[
                  signStyles.input,
                  confirmPasswordError && { borderColor: "red" },
                ]}
                placeholder="Confirm Password"
                secureTextEntry
                value={confirmPassword}
                onChangeText={(text) => {
                  setConfirmPassword(text);
                  setConfirmPasswordError(false);
                }}
              />
              {confirmPasswordError && (
                <Text style={{ color: "red" }}>Passwords do not match.</Text>
              )}
            </View>
            <PrimaryButton
              text={isLoading ? "" : "Sign up"}
              onPress={handlePress}
              style={signStyles.buttonPrimary}
              disabled={isLoading || usernameError}
            >
              {isLoading && <ActivityIndicator color="white" />}
            </PrimaryButton>
          </View>
        </View>
        <View style={signStyles.outerContainer}>
          <View style={[signStyles.line, { marginRight: 10 }]} />
          <Text>OR</Text>
          <View style={[signStyles.line, { marginLeft: 10 }]} />
        </View>
        <Pressable onPress={() => navigation.navigate("Signin")}>
          <View style={signStyles.leaveScreenContainer}>
            <Text style={signStyles.navigateLink}>Sign in</Text>
          </View>
        </Pressable>
      </LinearGradient>
    </View>
  );
}
