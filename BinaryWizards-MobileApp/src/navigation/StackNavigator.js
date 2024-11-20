import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import JoinOrContinueScreen from "../screens/JoinOrContinueScreen";
import QuestionScreen from "../screens/QuestionsScreen";
import EndScreen from "../screens/EndScreen";
import CreateGame from "../screens/CreateGame";

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
                name="Join"
                component={JoinOrContinueScreen}
                options={{ headerShown: true, title: "Join a quiz" }
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