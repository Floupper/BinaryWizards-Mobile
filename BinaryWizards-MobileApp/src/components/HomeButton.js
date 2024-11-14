import { Pressable, Text, View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";

export default function HomeButton() {
  const navigation = useNavigation();
  return (
      <Pressable
        onPress={() => navigation.navigate("Home")}
        style={{
          margin: 10,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Icon name="arrowleft" size={30} color="#000" />
        <Text>Leave quiz</Text>
      </Pressable>
  );
}
