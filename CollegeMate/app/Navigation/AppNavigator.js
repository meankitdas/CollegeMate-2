import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SearchingScreen from "../screens/SearchingScreen";
import FriendScreen from "../screens/FriendScreen";
import MessageNavigator from "./MessageNavigator";
import FriendNavigator from "./FriendNavigation"
import NewListingButton from "./NewListingButton";
import AccountNavigator from "./AccountNavigator";

import colors from "../config/colors";

import { MaterialCommunityIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator
      
      tabBarOptions={{
        keyboardHidesTabBar: true,
        showLabel: false,
        style: {
          backgroundColor: colors.primary,
          height: 52
        },
       activeTintColor: '#fff',
       inactiveTintColor: 'lightgray',
      }}
    >
      <Tab.Screen
        name="Feed"
        component={MessageNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="message" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={FriendNavigator}
        options={({ navigation }) => ({
          tabBarButton: () => (
            <NewListingButton onPress={() => navigation.navigate("Search")} />
          ),
        })}
      />
      <Tab.Screen
        name="Account"
        component={AccountNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
