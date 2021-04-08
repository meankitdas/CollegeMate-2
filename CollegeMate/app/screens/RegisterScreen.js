import React, { useState } from "react";
import { Image, StyleSheet, ScrollView, View } from "react-native";
import * as Yup from "yup";

import Screen from "../components/Screen";
import FormField from "../components/Forms/FormField";
import SubmitButton from "../components/SubmitButton";
import Form from "../components/Forms/Form";
import colors from "../config/colors";
import AppText from "../components/Text";
import TouableText from "../components/TouableText";
import firebase from "firebase";
import ExtraLoadScreen from "../screens/ExtraLoadScreen";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(6).label("Password"),
  confirm: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), null], "Passwords must be match"),
});

export default function RegisterScreen({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);

  const submitUser = (value) => {
    const email = Object.values(value)[0];
    const password = Object.values(value)[1];

    setRefreshing(true);
    RegisterUser(email, password);
  };

  const RegisterUser = async (email, password) => {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        setRefreshing(false);
        console.log("User account created & signed in!");
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          console.log("That email address is already in use!");
        }

        if (error.code === "auth/invalid-email") {
          console.log("That email address is invalid!");
        }

        console.error(error);
      });
  };

  return (
    <Screen>
      <ExtraLoadScreen visible={refreshing} />
      <View style={styles.container}>
        <AppText style={styles.signup}>SignUp</AppText>
        <Form
          initialValues={{ email: "", password: "" }}
          onSubmit={submitUser}
          validationSchema={validationSchema}
        >
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="email"
            keyboardType="email-address"
            name="email"
            placeholder="Email"
            textContentType="emailAddress"
          />
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            name="password"
            secureTextEntry
            placeholder="Password"
            textContentType="password"
          />
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            name="confirm"
            secureTextEntry
            placeholder="Confirm Password"
          />
          <View style={styles.button}>
            <SubmitButton title="signup" />
          </View>
          {/* <TouableText
            title="Have an account?"
            style={{ alignSelf: "center", marginTop: 190 }}
            onPress={() => navigation.navigate("LoginScreen")}
          /> */}
        </Form>
        {/* </ScrollView> */}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 250,
    height: 60,
    alignSelf: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  container: {
    backgroundColor: "#000000",
    flex: 1,
  },
  signup: {
    color: colors.white,
    alignSelf: "center",
    fontSize: 35,
    marginTop: 15,
    marginBottom: 3,
  },
  button: {
    top: -15,
  },
});
