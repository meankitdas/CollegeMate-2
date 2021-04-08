import React, { useState, useEffect, useCallback } from "react";
import { View, ScrollView, Text, Button, StyleSheet } from "react-native";
import { Bubble, GiftedChat, Send } from "react-native-gifted-chat";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";

import * as firebase from "firebase";
import "firebase/firestore";
import firebaseConfig from "../config/config";

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const dbh = firebase.firestore();

const ExampleDo = ({ senderId }) => {
  const [messages, setMessages] = useState([]);
  const [visible, setVisible] = useState(false);

  const list = [];
  const postUserMessage = async () => {
    let myuid = firebase.auth().currentUser.uid;
    console.log("The main user id is: ", myuid);

    try {
      await dbh
        .collection("Messages")
        .add({
          senderId: senderId,
          text: messages,
          CreatedAt: new Date(),
          _id: myuid,

          // postTime: firestore.Timestamp.fromDate(new Date()),
        })
        .then(() => {
          console.log("data Added!");

          console.log("data published!");
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

  const DataMessages = async () => {
    let myuid = firebase.auth().currentUser.uid;
    console.log("The search user id is: ", myuid);

    let users = await dbh
      .collection("Messages")
      .where("_id", "==", myuid)
      .where("senderId", "==", senderId)
      .get()
      .then((querySnapshot) => {
        console.log("Total Users: ", querySnapshot.size);
        // setNearusers(querySnapshot.size);

        querySnapshot.forEach((doc) => {
          const { text } = doc.data();
          list.push({
            text,
          });
        });
        // console.log(list)
      });

    // console.log("My lis------->", list);
  };

  //   useEffect(() => {
  //     setMessages([
  //       {
  //         _id: 1,
  //         text: "Hello developer",
  //         createdAt: new Date(),
  //         user: {
  //           _id: 2,
  //           name: "React Native",
  //           avatar: "https://placeimg.com/140/140/any",
  //         },
  //       },
  //       {
  //         _id: 2,
  //         text: "Hello world",
  //         createdAt: new Date(),
  //         user: {
  //           _id: 1,
  //           name: "React Native",
  //           avatar: "https://placeimg.com/140/140/any",
  //         },
  //       },
  //     ]);
  //   }, []);

  const onSend = useCallback((messages) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    setVisible(true);
  }, []);

  if (visible) {
    postUserMessage();
    // DataMessages();
    console.log(messages)
  }

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
            name="send-circle"
            style={{ marginBottom: 5, marginRight: 5 }}
            size={32}
            color="#2e64e5"
          />
        </View>
      </Send>
    );
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#2e64e6",
          },
        }}
        textStyle={{
          right: {
            color: "#fff",
          },
        }}
      />
    );
  };

  const scrollToBottomComponent = () => {
    return <FontAwesome name="angle-double-down" size={22} color="#333" />;
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      
      user={{
        _id: 1,
      }}
      renderBubble={renderBubble}
    //   alwaysShowSend
      renderSend={renderSend}
      scrollToBottom
      scrollToBottomComponent={scrollToBottomComponent}
    />
  );
};

export default ExampleDo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
