import React from "react";
import { StyleSheet, TouchableOpacity, Image } from "react-native";
import AppText from "./Text";
import LottieView from "lottie-react-native";
import { useFonts, Nunito_600SemiBold } from "@expo-google-fonts/nunito";

import colors from "../config/colors";
import Icon from "../components/Icon";

export default function categoryPicker({ item, onPress }) {

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
    <TouchableOpacity onPress={onPress} style={styles.container}>
        <Icon
          backgroundColor={colors.extra}
          name="person" //item.icon
          imageUri = {item.imageUri}
          extra={true}
          size={80}
        />
        
        <AppText style={styles.label}>{item.name}</AppText>
    </TouchableOpacity>
  );}
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: "center",
    width: "33%",
    flex:1,
  },
  label: {
    marginTop: 5,
    fontFamily: "Nunito_600SemiBold",
    textAlign: "center",
  },
  
});
