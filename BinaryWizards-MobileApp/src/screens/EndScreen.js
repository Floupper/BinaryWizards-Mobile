import { Text, View } from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import { useNavigation } from "@react-navigation/native";
import { styleContainer } from "../styles/container";
import { styleText } from "../styles/text";
import { resetQuiz } from "../services/requests";

export default function EndScreen({ route }) {
  const { score, quizId } = route.params;
  const navigation = useNavigation();

  const backToHome = () => {
    navigation.navigate("Home");
  };

  const playAgain = () => {
    resetQuiz(quizId, navigation);
  };

  return (
    <View style={styleContainer.mainContainer}>
      <View style={styleContainer.quizIdContainer}>
        <Text style={styleText.quizIdText}>Quiz id : {quizId}</Text>
      </View>
      <View style={styleContainer.middleSection}>
        <Text>Score final : {score}</Text>
      </View>
      <View style={styleContainer.bottomSection}>
        <PrimaryButton
          disabled={false}
          text={"Back to Home"}
          onPress={backToHome}
        />
        <PrimaryButton
          disabled={false}
          text={"Play Again"}
          onPress={playAgain}
        />
      </View>
    </View>
  );
}
