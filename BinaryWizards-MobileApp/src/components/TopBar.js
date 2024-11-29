import React, { useCallback, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { styleContainer } from "../styles/container";
import { styleButton } from "../styles/buttons";
import SecondaryButton from "./SecondaryButton";
import { styleText } from "../styles/text";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { _retrieveUserToken } from "../utils/asyncStorage";
import IconButton from "./IconButton";
import { logout } from "../utils/asyncStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TopBar() {
  const [userToken, setUserToken] = useState(null);
  const [username, setUsername] = useState(null);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      const refreshToken = async () => {
        try {
          const value = await _retrieveUserToken(navigation);
          if (!value) {
            setUserToken(null);
            logout(navigation);
            return;
          }
          setUserToken(value);

          const storedUsername = await AsyncStorage.getItem("username");
          setUsername(storedUsername);
        } catch (error) {
          console.error("Error refreshing token:", error);
        }
      };
      refreshToken();
    }, [])
  );

  const handlePress = async () => {
    logout(navigation);
    setUserToken(null);
    setUsername(null);
  }

  return (
    <View style={styleContainer.topBar}>
      {userToken ? (
        <>
          <View
            style={style.topBar}
          >
            <IconButton
              icon="logout"
              color="black"
              onPress={handlePress}
              text="Logout"
            />
            <View>
              <Text style={style.topBarText}>Hey👋</Text>
              <Text style={style.topBarText}>{username}</Text>
            </View>
          </View>
        </>
      ) : (
        <>
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
        </>
      )}
    </View>
  );
}

const style = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  topBarText: {
    color: "black",
    fontSize: 20,
    marginRight: 10,
  },
});