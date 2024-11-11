import { Text, View, StyleSheet } from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import { useNavigation } from "@react-navigation/native";

export default function EndScreen({ route }) {
  const { score, quizId } = route.params;
  const navigation = useNavigation();

  const backToHome = () => {
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <View style={styles.quizIdContainer}>
        <Text style={styles.quizIdText}>Quiz id : {quizId}</Text>
      </View>
      <View style={styles.middleSection}>
        <Text>Score final : {score}</Text>
      </View>
      <View style={styles.bottomSection}>
        <PrimaryButton
          disabled={false}
          text={"Back to Home"}
          onPress={backToHome}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  quizIdContainer: {
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  quizIdText: {
    textAlign: "center",
    color: "lightgray",
  },
  middleSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomSection: {
    margin:80
  },
});
