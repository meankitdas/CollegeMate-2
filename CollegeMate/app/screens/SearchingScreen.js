import React, { useState, useEffect } from "react";
import { View, StyleSheet, Modal } from "react-native";
import LottieView from "lottie-react-native";
import { useFonts, Nunito_600SemiBold } from "@expo-google-fonts/nunito";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

import * as firebase from "firebase";
import "firebase/firestore";

import Text from "../components/Text";
import { firebaseConfig } from "../config/config";
import colors from "../config/colors";

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const dbh = firebase.firestore();

export default function SearchingScreen({ onDone, visible = true }) {
  const [data, setdata] = useState([]);
  const [location, setLocation] = useState([]);
  const [upload, setUpload] = useState(false);
  // const [distance, setDistance] = useState();

  useEffect(() => {
    users();
  }, []);

  const list = [];
  const locations = [];

  function getuserId(documentSnapshot) {
    return documentSnapshot.get("userId");
  }

  const users = async () => {
    let myuid = firebase.auth().currentUser.uid;
    console.log("The search user id is: ", myuid);

    let users = await dbh
      .collection("Users")
      .where("userId", "!=", myuid)
      .get()
      .then((querySnapshot) => {
        console.log("Total Users: ", querySnapshot.size);

        querySnapshot.forEach((doc) => {
          const { userId, latitude, longitude } = doc.data();
          list.push({
            userId,
            latitude,
            longitude,
          });
        });
      });

    let userLocation = await dbh
      .collection("Users")
      .where("userId", "==", myuid)
      .get()
      .then((querySnapshot) => {
        console.log("Me: ", querySnapshot.size);

        querySnapshot.forEach((doc) => {
          const { latitude, longitude } = doc.data();
          locations.push({
            latitude,
            longitude,
          });
        });
      });
    setLocation(locations);
    setdata(list);
    setUpload(true);
  };

  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    var distance_m = d * 1000;
    // setDistance(distance_m)
    // console.log(distance,"meters")
    return distance_m;
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  if (upload) {
    let x = 0;
    data.forEach(() => {
      let distance = getDistanceFromLatLonInKm(
        location[0].latitude,
        location[0].longitude,
        data[x].latitude,
        data[x].longitude
      );

      // console.log(distance, "extra meter")
      // console.log("userId: ", data[x].userId);


      if (distance <= 100) {
        console.log(distance, "meter");
        console.log("userId: ", data[x].userId);
      } else {
        console.log("Nothing found");
      }
      x++;
    });
  }

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
      <Modal visible={true}>
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
