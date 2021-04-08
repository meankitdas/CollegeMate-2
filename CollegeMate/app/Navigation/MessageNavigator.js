import React from "react";
import {
  createStackNavigator,
  HeaderBackButton,
} from "@react-navigation/stack";
import { StatusBar } from "react-native";
import LottieView from "lottie-react-native";
import { useFonts, Nunito_600SemiBold } from "@expo-google-fonts/nunito";

import MessagesScreen from "../screens/MessagesScreen";

import colors from "../config/colors";

export default function MessageNavigator() {
  const Stack = createStackNavigator();
  const [fontsLoaded] = useFonts({
    Nunito_600SemiBold,
  });

  if (!fontsLoaded) {
    return (
      <LottieView
        autoPlay
        loop={true}
        source={require("../assets/animations/loader.json")}
        // style={styles.animations}
      />
    );
  } else {
  return (
    <>
      <StatusBar hidden />
      <Stack.Navigator mode="modal">
        <Stack.Screen
          name="Messages"
          component={MessagesScreen}
          options={{
            headerShown: true,
            headerTitleAlign: "center",
            color: "white",
            headerStyle: {
              backgroundColor: colors.primary,
            },
            headerTitleStyle: {
              color: "white",
              fontFamily: "Nunito_600SemiBold"
            },
          }}
        />
      </Stack.Navigator>
    </>
  );}
}
