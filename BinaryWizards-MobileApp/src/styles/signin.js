import { StyleSheet } from "react-native";

export const stylesSignin = StyleSheet.create({
  inputsContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    borderColor: "lightgray",
    borderWidth: 1,
    margin: 20,
    padding: 20,
    width: "90%",
  },
  inputLabel: {
    fontWeight: "600",
    marginBottom: 5,
  },
  signinButton:{
    backgroundColor: "black",
    color: "white",
    borderRadius: 10,
    width: "100%",
    marginTop: 20,
    padding: 10,
  },
  line: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    width: "60%",
  },
  navigateSignup:{
    color: "#0033FF",
    fontWeight: "600",
    textDecorationLine: "underline",
  }
});

export const signBackgroundColors = ["#E4BB9180", "#8A2BF280", "#2960F080"];
