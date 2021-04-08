import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const Sent = ({ message, time }) => {
  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <LinearGradient colors={["#5D6D7E", "#F2F3F4"]} style={styles.gradient}>
          <Text style={styles.text}>{message}</Text>
        </LinearGradient>
      </View>
        <Text style={styles.duration}>{time}</Text>
    </View>
  );
};
export default Sent;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    flex: 1,
    alignSelf: "flex-end",
    width: "100%",
    
    flexDirection: "row",
    justifyContent: "flex-end",
    
    // position: 'absolute',
    right: 5
  },
  duration: {
    color: "#b6b6b6",
    fontSize: 11,
    marginTop: 5,
    // fontFamily:'Montserrat_600SemiBold',
    alignSelf: "flex-end",
  },
  gradient: {
    maxWidth: 200,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // paddingHorizontal: 10,
    paddingVertical: 10,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 25,
  },

  text: {
    color: "#000000",
    // fontFamily:'Montserrat_700Bold'
  },
  main: {
    width: "100%",

    flex: 1,
    flexDirection: "column",
  },
});
