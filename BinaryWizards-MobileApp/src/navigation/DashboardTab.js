import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/AntDesign";
import MyQuizzes from "../screens/MyQuizzes";
import GamesHistory from "../screens/GamesHistory";

const Tab = createBottomTabNavigator();

export default function DashboardTab() {
  const quizzesRoute = "My quizzes";
  const gamesRoute = "My games";

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === quizzesRoute) {
            iconName = "barschart";
          } else if (route.name === gamesRoute) {
            iconName = "database";
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#3552b0",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name={quizzesRoute}
        component={MyQuizzes}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name={gamesRoute}
        component={GamesHistory}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};