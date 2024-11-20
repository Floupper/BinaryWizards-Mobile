import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import QuestionScreen from "../screens/QuestionsScreen";
import EndScreen from "../screens/EndScreen";
import CreateGame from "../screens/CreateGame";
import ResumeGamesScreen from "../screens/ResumeGamesScreen";

const Stack = createNativeStackNavigator();

export default function StackNavigator() {

    return (<>
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ headerShown: false, title: "Home" }
                }
            />
            <Stack.Screen
                name="ResumeGames"
                component={ResumeGamesScreen}
                options={{ headerShown: true, title: "Resume game" }
                }
            />
            <Stack.Screen
                name="Create"
                component={CreateGame}
                options={{ headerShown: true, title: "Create a game" }
                }
            />
            <Stack.Screen
                name="Questions"
                component={QuestionScreen}
                options={{ headerShown: false }
                }
            />
            <Stack.Screen
                name="End"
                component={EndScreen}
                options={{ headerShown: false }
                }
            />
        </Stack.Navigator>
    </>);
}