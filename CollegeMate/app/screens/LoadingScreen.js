import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

import firebase from "firebase";

export default class LoadingScreen extends Component {
  componentDidMount() {
    this.checkIfLoggedIn();
  }

  checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.navigation.navigate("MainScreen");
      } else {
        this.props.navigation.navigate("AuthScreen");
      }
    });
  };
  render() {
    return (
      <View style={styles.container}>
        <LottieView
          autoPlay
          loop={true}
          source={require("../assets/animations/loader.json")}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
