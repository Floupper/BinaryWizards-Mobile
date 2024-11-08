import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import JoinOrContinueScreen from "../screens/JoinOrContinueScreen";
import PlayScreen from "../screens/PlayScreen";

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
                options={{ headerShown: true, title: "Join" }
                }
            />
            <Stack.Screen
                name="Play"
                component={PlayScreen}
                options={{ headerShown: true, title: "Play" }
                }
            />
        </Stack.Navigator>
    </>);
}