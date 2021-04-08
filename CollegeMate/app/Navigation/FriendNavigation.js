import React from "react";
import {
  createStackNavigator,
  HeaderBackButton,
} from "@react-navigation/stack";


import colors from "../config/colors"
import FriendScreen from "../screens/FriendScreen"
import ChatScreen from "../screens/ChatScreen"

export default function FriendNavigator() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator mode="modal">
      <Stack.Screen
        name="friend"
        component={FriendScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="chat"
        component={ChatScreen}
        options={{
          //   headerShown: false,
          headerTitle: false,
          
          headerTransparent: true,
          headerLeft: (props) => (
            <HeaderBackButton {...props} style={{backgroundColor: colors.light, padding: 5, borderRadius:50}} />
          ),
        }}
      />
    </Stack.Navigator>
  );
}
