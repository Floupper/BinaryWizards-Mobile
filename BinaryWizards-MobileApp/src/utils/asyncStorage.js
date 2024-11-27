import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

export async function _retrieveUserToken() {
  try {
    const value = await AsyncStorage.getItem("userToken");
    if (value !== null) {
      return value;
    }
  } catch (error) {
    Toast.show({
      type: "error",
      text1: "Error",
      text2: "An error occured while retrieving user token",
    });
    console.error("Error retrieving user token:", error);
  }
}

export async function _removeUserToken() {
  try {
    await AsyncStorage.removeItem("userToken");
  } catch (error) {
    Toast.show({
      type: "error",
      text1: "Error",
      text2: "An error occured while logging out",
    });
    console.error("Error removing user token:", error);
  }
}

export async function _storeUserToken(token) {
  try {
    await AsyncStorage.setItem("userToken", token);
  } catch (error) {
    Toast.show({
      type: "error",
      text1: "Error",
      text2: "An error occured while storing user token",
    });
    console.error("Error storing user token:", error);
  }
}

export const logout = async (navigation) => {
  try {
    await _removeUserToken();
    navigation.navigate("Home");
  } catch (error) {
    console.error("Error logging out:", error);
    Toast.show({
      type: "error",
      text1: "Error logging out",
      text2: "Please try again",
    });
  }
};
