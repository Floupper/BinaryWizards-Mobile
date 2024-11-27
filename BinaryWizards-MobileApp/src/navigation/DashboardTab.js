import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/AntDesign";
import Dashboard from "../screens/Dashboard";
import Statistics from "../screens/Statistics";

const Tab = createBottomTabNavigator();

export default function DashboardTab() {
  return (
    <Tab.Navigator

      // Configure screen options dynamically based on the route
      screenOptions={({ route }) => ({

        // Define the icon for each tab
        tabBarIcon: ({ color, size }) => {
          let iconName;

          // Assign icon names based on the route name
          if (route.name === "Dashboard") {
            iconName = "home"; // Icon for the "Dashboard" tab
          } else if (route.name === "Statistics") {
            iconName = "linechart"; // Icon for the "Statistics" tab
          }

          // Return the icon component with the specified properties
          return <Icon name={iconName} size={size} color={color} />;
        },

        // Set the color for the active tab icon
        tabBarActiveTintColor: "#3552b0",

        // Set the color for the inactive tab icon
        tabBarInactiveTintColor: "gray",
      })}
    >

      {/* Define the "Dashboard" tab */}
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{ headerShown: false }}
      />

      {/* Define the "Statistics" tab */}
      <Tab.Screen
        name="Statistics"
        component={Statistics}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};