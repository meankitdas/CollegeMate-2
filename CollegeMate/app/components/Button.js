import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { useFonts, Nunito_600SemiBold } from "@expo-google-fonts/nunito";
import LottieView from "lottie-react-native";

import colors from "../config/colors";

function Button({ title, color = "primary", onPress }) {
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
      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors[color] }]}
        onPress={onPress}
      >
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: colors.white,
    textTransform: "uppercase",
    fontSize: 18,
    fontFamily: "Nunito_600SemiBold",
    
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    padding: 15,
    width: "50%",
    marginVertical: 10,
    top: 200,
  },
});

export default Button;
