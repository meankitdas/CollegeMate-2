import React, { useState } from "react";
import { FlatList, StatusBar } from "react-native";

import ListItem from "../components/Lists/ListItem";
import ListItemDelete from "../components/Lists/ListItemDelete";
import ListItemSeparator from "../components/Lists/ListItemSeparator";
import Screen from "../components/Screen"


const initialMessages = [
  {
    id: 1,
    title: "Mosh Hamida",
    description: "Hey! How are you buddy?",
    image: require("../assets/mosh.jpg"),
  },
  {
    id: 2,
    title: "Ankit",
    description: "Do know what happened yesterday...That boy whom we saw at the store is Justin Bieber",
    image: require("../assets/ankit.jpg"),
  },
];

// New Thing Must Learn this Bro !!!
function MessagesScreen(props) {
  const [messages, setmessage] = useState(initialMessages);
  const [refreshing, setRefreshing] = useState(false);

  const handleDelete = (message) => {
    // Delete Message
    const newMessage = messages.filter((m) => m.id !== message.id);
    setmessage(newMessage);
  };

  // New Things  END HERE!!!

  return (
    // <ScrollView showsVerticalScrollIndicator={false}>
    <Screen>
      <FlatList
        data={messages}
        keyExtractor={(message) => message.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ListItem
            title={item.title}
            subtitle={item.description}
            image={item.image}
            onPress={() => console.log("Message selected", item)}
            renderRightActions={() => (
              <ListItemDelete onPress={() => handleDelete(item)} />
            )}
          />
        )}
        ItemSeparatorComponent={ListItemSeparator}
        refreshing={refreshing}
        onRefresh={() => {
          setmessage([
            {
              id: 3,
              title: "Mosh Hamida",
              description: "Pick up the phone!!!",
              image: require("../assets/jacket.jpg"),
            },
            {
              id: 4,
              title: "Mosh Hamida",
              description: "Bro recieve the parcel...Quickly and let me know",
              image: require("../assets/mosh.jpg"),
            },
          ]);
        }}
      />
      </Screen>
    
  );
}

export default MessagesScreen;
