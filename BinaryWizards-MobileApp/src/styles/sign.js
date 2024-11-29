import { StyleSheet } from "react-native";

export const signStyles = StyleSheet.create({
  // Shared container styles
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  inputsContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    borderColor: "lightgray",
    borderWidth: 1,
    margin: 20,
    padding: 20,
    width: "90%",
  },

  // Input styles
  input: {
    backgroundColor: "white",
    borderRadius: 10,
    borderColor: "lightgray",
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  inputLabel: {
    fontWeight: "600",
    marginBottom: 5,
  },
  inputContainer: {
    marginBottom: 15,
  },

  // Buttons
  buttonPrimary: {
    backgroundColor: "black",
    color: "white",
    borderRadius: 10,
    width: "100%",
    marginTop: 20,
    padding: 10,
  },

  // Lines and navigation links
  line: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    width: "60%",
  },
  navigateLink: {
    color: "#0033FF",
    fontWeight: "600",
    textDecorationLine: "underline",
  },

  // Text styles
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  subtitle: {
    color: "gray",
    fontWeight: "600",
    marginBottom: 15,
  },

  // Layout styles
  svgContainer: {
    width: "20%",
    height: "20%",
  },
  textContainer: {
    textAlign: "left",
  },
  outerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "40%",
  },
  leaveScreenContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
});

export const signBackgroundColors = ["#E4BB9180", "#8A2BF280", "#2960F080"];
