import React from "react";
import {
  createStackNavigator,
  HeaderBackButton,
} from "@react-navigation/stack";

import LoginScreen from "../screens/LoginScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import RegisterScreen from "../screens/RegisterScreen";
import colors from "../config/colors";

export default function AuthNavigator() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator mode="modal">
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerTitle: false,
          headerTransparent: true,
          headerLeft: (props) => (
            <HeaderBackButton
              {...props}
              style={{
                backgroundColor: colors.light,
                padding: 5,
                borderRadius: 50,
              }}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Signup"
        component={RegisterScreen}
        options={{
          headerTitle: false,
          headerTransparent: true,
          headerLeft: (props) => (
            <HeaderBackButton
              {...props}
              style={{
                backgroundColor: colors.light,
                padding: 5,
                borderRadius: 50,
              }}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}
