import React from 'react'
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "../Navigation/AuthNavigator";
import Theme from "../Navigation/Theme";

export default function AuthScreen() {
    return (
      <NavigationContainer theme={Theme}>
      <AuthNavigator />
    </NavigationContainer>
    )
}
