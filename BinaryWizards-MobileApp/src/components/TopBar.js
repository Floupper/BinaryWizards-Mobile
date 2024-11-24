import React, { useCallback, useState } from "react";
import { View } from "react-native";
import { styleContainer } from "../styles/container";
import { styleButton } from "../styles/buttons";
import SecondaryButton from "./SecondaryButton";
import { styleText } from "../styles/text";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import IconButton from "./IconButton";

export default function TopBar() {
  const [userToken, setUserToken] = useState(null);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      const refreshToken = async () => {
        try {
          const value = await AsyncStorage.getItem("userToken");
          setUserToken(value);
        } catch (error) {
          console.error("Error refreshing token:", error);
        }
      };
      refreshToken();
    }, [])
  );

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
              onPress={async () => {
                try {
                  await AsyncStorage.removeItem("userToken");
                  setUserToken(null);
                  navigation.navigate("Home");
                } catch (error) {
                  console.error("Error logging out:", error);
                }
              }}
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
