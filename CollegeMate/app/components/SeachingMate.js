import React from 'react'
import { View, StyleSheet, Modal } from "react-native";
import LottieView from "lottie-react-native";
import { useFonts, Nunito_600SemiBold } from "@expo-google-fonts/nunito";

import Text from "../components/Text";
import colors from "../config/colors";



export default function SeachingMate({ visible = true }) {
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
          <Modal visible={visible}>
            <View style={styles.container}>
              <LottieView
                autoPlay
                loop={true}
                source={require("../assets/animations/search.json")}
                style={styles.animations}
              />
              <Text style={styles.text}>Searching Mates...</Text>
            </View>
          </Modal>
        );
      }
}

const styles = StyleSheet.create({
    animations: {
      width: 500,
    },
    container: {
      alignItems: "center",
      flex: 1,
      justifyContent: "center",
    },
    text: {
      fontFamily: "Nunito_600SemiBold",
      color: colors.medium,
    },
  });