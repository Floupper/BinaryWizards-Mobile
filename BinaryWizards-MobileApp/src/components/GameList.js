import { Text, View } from "react-native";
import { styleContainer } from "../styles/container";

export default function GameList({user}){

    return(
        <View style={styleContainer.gameList}>
            {user ?? <Text>There are no games to resume</Text>}
        </View>
    )
}