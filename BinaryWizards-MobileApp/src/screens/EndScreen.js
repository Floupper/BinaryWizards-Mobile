import { Text, View } from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import { useNavigation } from "@react-navigation/native";
import { styleContainer } from "../styles/container";
import { styleText } from "../styles/text";
import { styleButton } from "../styles/buttons";
import { resetQuiz } from "../services/endRequests";

export default function EndScreen({ route }) {
  const { quizId, gameId, correct_answers_nb, nb_questions_total } =
    route.params;
  const navigation = useNavigation();

  const backToHome = () => {
    navigation.navigate("Home");
  };

  const playAgain = () => {
    resetQuiz(quizId, navigation);
  };

  return (
    <View style={styleContainer.mainContainer}>
      <View style={styleContainer.gameIdContainer}>
        <Text style={styleText.gameIdText}>Quiz id : {quizId}</Text>
      </View>
      <View>
        <Text style={styleText.gameIdText}>Game id : {gameId}</Text>
      </View>
      <View style={styleContainer.middleSection}>
        <Text style={styleText.title}>Quiz completed!</Text>
        <Text style={styleText.secondary}>
          Correct answers : {correct_answers_nb}/{nb_questions_total}
        </Text>
      </View>
      <View style={styleContainer.bottomSection}>
        <PrimaryButton
          disabled={false}
          text={"Back to home page"}
          onPress={backToHome}
          style={styleButton.button}
        />
        <PrimaryButton
          disabled={false}
          text={"Restart quiz"}
          onPress={playAgain}
          style={styleButton.button}
        />
      </View>
    </View>
  );
}
