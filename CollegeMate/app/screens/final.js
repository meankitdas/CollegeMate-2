import React,{useState, useEffect} from "react";
import { View, StyleSheet, Modal } from "react-native";
import LottieView from "lottie-react-native";
import AppLoading from "expo-app-loading";
import { useFonts, Nunito_600SemiBold } from "@expo-google-fonts/nunito";


import Text from "../components/Text";
import { firebaseConfig } from "../config/config"
import colors from "../config/colors";

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const dbh = firebase.firestore();



export default function SearchingScreen({ onDone, visible = true }) {
  
  const [data, setdata] = useState();

  const getuserId(documentSnapshot) {
    return documentSnapshot.get("userId");
  }

  const users = async () => {
   

    let myuid = firebase.auth().currentUser.uid;
    console.log("The search user id is: ", myuid);

    await dbh
      .collection("Users")
      .where("userId", "!=", myuid)
      .get()
      .then((querySnapshot) => {
        console.log("Total users: ", querySnapshot.size);

        querySnapshot.forEach((documentSnapshot) => {
          setdata(documentSnapshot.data());
          console.log(documentSnapshot.data());
        });
      });
  };

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
