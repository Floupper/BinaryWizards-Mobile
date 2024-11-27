import { StyleSheet } from "react-native";

export const styleContainer = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  quizIdContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "space-evenly",
    padding: 5,
  },
  gameIdContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "space-evenly",
    padding: 5,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  questionTitleContainer: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    margin: 20,
  },
  middleSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomSection: {
    margin: 80
  },
  gameList: {
    flex: 1,
    alignItems: "center",
    border: "0.1rem solid black",
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
  topBar: {
    flexDirection: "row",
    backgroundColor: "transparent",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 10,
  },
  gameListColumns:{
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 5,
    padding: 10,
  },
  quizListItem: {
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    margin: 5,
    border: "0.1rem solid lightgray",
    borderRadius: 10,
  },
  scrollView:{
    flex: 1,
  },
  gameListColumns: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    margin:5
  },
  gameListItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    margin: 5,
    border: "0.1rem solid lightgray",
    borderRadius: 10,
  },
});
