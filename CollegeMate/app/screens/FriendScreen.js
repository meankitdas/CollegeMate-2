import React, { useState, useEffect } from "react";
import { View, StyleSheet, Modal, FlatList } from "react-native";
import LottieView from "lottie-react-native";
import { useFonts, Nunito_600SemiBold } from "@expo-google-fonts/nunito";
import SearchingMate from "../components/SeachingMate";

import People from "../components/People";

import Text from "../components/Text";
import colors from "../config/colors";
import CategoryPicker from "../components/CategoryPicker";

import * as firebase from "firebase";
import "firebase/firestore";
import { firebaseConfig } from "../config/config";

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const dbh = firebase.firestore();

export default function FriendScreen({ navigation }) {
  // Storage of data.......................................>
  const [data, setdata] = useState([]);
  const [location, setLocation] = useState([]);
  const [upload, setUpload] = useState(false);
  const [visible, setVisible] = useState(true);
  const [name, setName] = useState();

  useEffect(() => {
    users();
  }, []);

  const categories = [
    {
      label: "Ankit",
      value: 1,
      imageUri: require("../assets/ankit.jpg"),
    },
    {
      label: "Amlan",
      value: 2,
    },
    { label: "Raj", value: 3 },
    { label: "Lalita", value: 4 },
  ];

  const UsersTable = [];
  const list = [];
  const locations = [];

  // const handleSubmit = async (listing, { resetForm }) => {
  //   setUploadVisible(true);
  //   const result = await listingsApi.addListings(listing);
  //   if (!result.ok) {
  //     return setUploadVisible(false), alert("Could not upload");
  //   }
  //   resetForm();
  // };

  function getuserId(documentSnapshot) {
    return documentSnapshot.get("userId");
  }

  // Getting User of data.......................................>

  const users = async () => {
    let myuid = firebase.auth().currentUser.uid;
    console.log("The search user id is: ", myuid);
    setName(myuid)

    let users = await dbh
      .collection("Users")
      .where("userId", "!=", myuid)
      .get()
      .then((querySnapshot) => {
        console.log("Total Users: ", querySnapshot.size);
        // setNearusers(querySnapshot.size);

        querySnapshot.forEach((doc) => {
          const { userId, latitude, longitude } = doc.data();
          list.push({
            userId,
            latitude,
            longitude,
          });
        });
      });

    // console.log(list);

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
    // console.log(locations);
    setLocation(locations);
    setdata(list);
    setUpload(true);
    setVisible(false);
  };

  // Calculate the distance......................................>

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

  // Saving the data.......................................>

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
        console.log(name)
        UsersTable.push({
          name: data[x].userId,
          myId: name,
        });
      }
      x++;
    });
    // setVisible(false)
  }
  console.log(UsersTable);

  const [fontsLoaded] = useFonts({
    Nunito_600SemiBold,
  });

  //   font loader
  // setVisible(false)

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
      <View style={styles.maincontainer}>
        {/* {visible ? (
          <SearchingMate visible={false} />
        ) : (
          <View style={styles.all}>
            <People />
          </View>
          // <SearchingMate visible={false} />
        )} */}
        <SearchingMate visible={visible} />
        <FlatList
          data={UsersTable}
          keyExtractor={(item) => item.name}
          numColumns={2}
          renderItem={({ item }) => (
            <CategoryPicker
              item={item}
              label={item.name}
              onPress={() => navigation.navigate("chat", item)}
            />
          )}
        />
      </View>
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
  maincontainer: {
    flex: 1,
  },
  all: {
    flex: 1,
    zIndex: 2,
  },
});
