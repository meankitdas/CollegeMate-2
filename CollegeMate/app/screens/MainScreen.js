import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "../Navigation/AppNavigator";
import Theme from "../Navigation/Theme";

import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import * as firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC8kYBSi5lhXng2GasuNJx6iR3vdgzRN-g",
  authDomain: "collegemate-fc6ce.firebaseapp.com",
  databaseURL: "https://collegemate-fc6ce-default-rtdb.firebaseio.com",
  projectId: "collegemate-fc6ce",
  storageBucket: "collegemate-fc6ce.appspot.com",
  messagingSenderId: "269773081486",
  appId: "1:269773081486:web:80d9ff12633012f4e1b2df",
  measurementId: "G-JYPGM3082B",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const dbh = firebase.firestore();

export default class MainScreen extends Component {
  componentDidMount() {
    this.getUserLocation();
  }

  getUserLocation = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      console.log("Permission for location denied!");
    }

    let location = await Location.getCurrentPositionAsync({
      enabledHighAccuracy: true,
    });
    let latitude = location.coords.latitude;
    let longitude = location.coords.longitude;
    // console.log(latitude);
    // console.log(longitude);

    let myuid = firebase.auth().currentUser.uid;
    console.log("The main user id is: ",myuid);

    try {
      await dbh
        .collection("Users")
        .doc(myuid)
        .set({
          userId: myuid,
          latitude: latitude,
          longitude: longitude,
          // postTime: firestore.Timestamp.fromDate(new Date()),
        })
        .then(() => {
          console.log("data Added!");

          console.log(
            "data published!"
          );
        })
        .catch((error) => {
          console.log(
            "Something went wrong with adding data to firestore.",
            error
          );
        });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <NavigationContainer theme={Theme}>
        <AppNavigator />
      </NavigationContainer>
    );
  }
}
