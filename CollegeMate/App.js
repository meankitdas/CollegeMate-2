import React from "react";
import { createSwitchNavigator, createAppContainer } from "react-navigation";

import { NavigationContainer } from "@react-navigation/native";
import Theme from "./app/Navigation/Theme";
import AuthNavigator from "./app/Navigation/AuthNavigator";

import LoginScreen from "./app/screens/LoginScreen";
import AuthScreen from "./app/screens/AuthScreen";
import MainScreen from "./app/screens/MainScreen";
import LoadingScreen from "./app/screens/LoadingScreen";
import ChatScreen from "./app/screens/ChatScreen";
import ExampleDo from "./app/screens/exampleDo";

import firebase from "firebase";
import { firebaseConfig } from "./app/config/config";
import { Button } from "react-native";
import Discussion from "./app/screens/DiscussionScreen";
import Mytext from "./app/components/mytext"

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export default function App() {
  const AppSwitchNavigator = createSwitchNavigator({
    LoadingScreen: LoadingScreen,
    AuthScreen: AuthScreen,
    MainScreen: MainScreen,
  });

  const AppNavigator = createAppContainer(AppSwitchNavigator);
  // return <ExampleDo senderId="bcbsjcjsckckc224s24c24c2ac2" />;
  // return <Mytext />;
  // return <Discussion />;
  return <AppNavigator />;
  // return <Button title="Click me" onPress={()=> console.log("hey")}/>
}
