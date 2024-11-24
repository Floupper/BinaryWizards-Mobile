import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/AntDesign";

import HomeScreen from "../screens/HomeScreen";
import QuestionScreen from "../screens/QuestionsScreen";
import EndScreen from "../screens/EndScreen";
import CreateGame from "../screens/CreateGame";
import ResumeGamesScreen from "../screens/ResumeGamesScreen";
import Signup from "../screens/Signup";
import Signin from "../screens/Signin";
import Dashboard from "../screens/Dashboard";
import Statistics from "../screens/Statistics";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const DashboardTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Dashboard") {
            iconName = "home";
          } else if (route.name === "Statistics") {
            iconName = "linechart";
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#3552b0",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Statistics"
        component={Statistics}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default function StackNavigator() {
  return (
    <>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false, title: "Home" }}
        />
        <Stack.Screen
          name="ResumeGames"
          component={ResumeGamesScreen}
          options={{ headerShown: true, title: "Resume game" }}
        />
        <Stack.Screen
          name="Create"
          component={CreateGame}
          options={{ headerShown: true, title: "Create a game" }}
        />
        <Stack.Screen
          name="Questions"
          component={QuestionScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="End"
          component={EndScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{ headerShown: true, title: "Sign Up" }}
        />
        <Stack.Screen
          name="Signin"
          component={Signin}
          options={{ headerShown: true, title: "Sign In" }}
        />
        <Stack.Screen name="Profile" component={DashboardTab} />
      </Stack.Navigator>
    </>
  );
}
