import React from "react";
import {
  createStackNavigator,
  HeaderBackButton,
} from "@react-navigation/stack";
import LottieView from "lottie-react-native";
import { useFonts, Nunito_600SemiBold } from "@expo-google-fonts/nunito";

import colors from "../config/colors";
import AccountScreen from "../screens/AccountScreen";

export default function FeedNavigator() {
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
      />
    );
  } else {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Account"
          component={AccountScreen}
          options={{
            headerShown: true,
            headerTitleAlign: "center",
            color: "white",
            headerStyle: {
              backgroundColor: colors.primary,
            },
            headerTitleStyle: {
              color: "white",
              fontFamily: "Nunito_600SemiBold",
            },
          }}
        />
      </Stack.Navigator>
    );
  }
}
