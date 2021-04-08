import React from "react";
import { Text, StyleSheet } from "react-native";
import colors from "../config/colors";
import { Platform } from "react-native";

import LottieView from "lottie-react-native";
import { useFonts, Nunito_600SemiBold } from "@expo-google-fonts/nunito";

import defaultStyle from "../config/styles";

function AppText({ children, style, ...otherProps }) {
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
      <Text style={[styles.text, style]} {...otherProps}>
        {children}
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontFamily:
      Platform.OS === "android" ? "Nunito_600SemiBold" : "Nunito_600SemiBold",
    color: colors.dark,
  },
});
export default AppText;
