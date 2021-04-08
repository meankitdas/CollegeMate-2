import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  LogBox,
} from "react-native";
import listingsApi from "../api/Listing";
import { AntDesign } from "@expo/vector-icons";
import Screen from "../components/Screen";
import client from "../api/client";
import Sent from "../components/Chats/Sent";
import Received from "../components/Chats/Received";

export default function ChatScreen({ route }) {
  const item = route.params;
  useEffect(() => {
    getdata();
    firstData();
  }, []);

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  const [ourdata, setOurdata] = useState();
  const [mess, setMess] = useState();
  const [task, setTask] = useState();
  const [time, setTime] = useState(Date.now());

  // useEffect(() => {
  //   var timer = setInterval(() => {
  //     getdata();
  //   }, 600);
  // }, []);

  const endpoint = item.myId + item.name;
  console.log(endpoint);
  // const myuid = "AAAAAAAA";
  const myuid = item.myId;
  const receiverId = item.name;
  const todoInput = useRef();
  const scrollView = useRef();

  const firstData = async () => {
    try {
      console.log("Hello World");

      let myresponse = await fetch(
        "https://2a672d163266.ngrok.io/posts/" + endpoint
      );
      let myjson = await myresponse.json();

      if (Array.isArray(myjson) && myjson.length) {
        // array exists and is not empty
        return;
      } else {
        let store = await fetch("https://2a672d163266.ngrok.io/posts/", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            unique: endpoint,
          }),
        });
      }

      console.log(myjson);

      console.log("Nice");
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    todoInput.current.clear();
    try {
      //   console.log("Hello World");
      let response = await fetch(
        "https://2a672d163266.ngrok.io/posts/" + endpoint,
        {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: {
              sender_id: myuid,
              receiver_id: receiverId,
              message: task,
            },
          }),
        }
      );
      // let json = await response.json();
      // return json;
      getdata();
      //   console.log("nice");
    } catch (error) {
      console.error(error);
    }
  };

  const getdata = async () => {
    try {
      let response = await fetch(
        "https://2a672d163266.ngrok.io/posts/" + endpoint
      );
      let json = await response.json();
      setMess(json);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.con}>
        <ScrollView
          ref={scrollView}
          onContentSizeChange={() => scrollView.current.scrollToEnd()}
          showsVerticalScrollIndicator={false}
        >
          <FlatList
            data={mess}
            keyExtractor={(listing) => listing._id.toString()}
            showsVerticalScrollIndicator={false}
            alwaysBounceVertical
            renderItem={({ item, index }) => (
              <View>
                {item.messages.map((v, i) => {
                  if (v.sender_id === myuid) {
                    return <Sent message={v.message} />;
                  }

                  if (v.sender_id !== myuid) {
                    return <Received message={v.message} />;
                  }
                })}
              </View>
            )}
          />
        </ScrollView>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder={"Type your message..."}
          ref={todoInput}
          value={task}
          onChangeText={(text) => setTask(text)}
        />
        <TouchableOpacity onPress={() => handleSubmit()}>
          <View style={styles.addWrapper}>
            {/* <Text style={styles.addText}>+</Text> */}
            <AntDesign name="arrowright" size={15} color="black" />
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
    // </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 5,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    flex: 1,
  },
  input: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#FFF",
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    width: 290,
  },
  addWrapper: {
    width: 55,
    height: 50,
    backgroundColor: "#FFF",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  addText: {},
  con: {
    maxHeight: "80%",
  },
});
