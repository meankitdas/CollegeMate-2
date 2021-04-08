import React from "react";
import { View, StyleSheet, Text, ImageBackground, Image } from "react-native";
import { useFonts, Nunito_600SemiBold } from "@expo-google-fonts/nunito";

import Screen from "../components/Screen";
import Button from "../components/Button";
import colors from "../config/colors";
import LottieView from "lottie-react-native";

export default function WelcomeScreen({ navigation }) {
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
      <ImageBackground
        blurRadius={2}
        style={styles.background}
        source={require("../assets/Welcome.jpg")}
      >
        <Screen>
          <View style={styles.container}>
            <Image style={styles.logo} source={require("../assets/logo.png")} />
            <Button
              title="Login"
              onPress={() => navigation.navigate("Login")}
            />
            <Button
              title="Signup"
              color="secondary"
              onPress={() => navigation.navigate("Signup")}
            />
          </View>
        </Screen>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // justifyContent: "center",
    // alignItems: "center",
    flex: 1,
  },
  background: {
    width: "100%",
    height: "100%",
  },
  text: {
    color: colors.white,
    fontFamily: "Nunito_600SemiBold",
    fontSize: 60,
  },
  logo: {
    width: 300,
    height: 200,
    alignSelf: "center",
  },
  button: {
    width: "50%",
    fontFamily: "Nunito_600SemiBold",
    backgroundColor: "red",
  },
});
