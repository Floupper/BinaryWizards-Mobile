import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { styleContainer } from "../styles/container";
import { styleButton } from "../styles/buttons";
import SecondaryButton from "./SecondaryButton";
import { styleText } from "../styles/text";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { _retrieveUserToken } from "../utils/asyncStorage";
import IconButton from "./IconButton";
import { logout } from "../utils/asyncStorage";

export default function TopBar() {
  const [userToken, setUserToken] = useState(null);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      const refreshToken = async () => {
        try {
          const value = await _retrieveUserToken(navigation);
          if(!value) {
            setUserToken(null);
            logout(navigation);
            return;
          }
          setUserToken(value);
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
  } 

  return (
    <View style={styleContainer.topBar}>
      {userToken ? (
        <>
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              justifyContent: "space-between",
            }}
          >
            <IconButton
              icon="logout"
              color="black"
              onPress={handlePress}
              text="Logout"
            />
            <IconButton
              onPress={() => navigation.navigate("Profile")}
              color="black"
              icon="user"
              text="Profile"
            />
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
