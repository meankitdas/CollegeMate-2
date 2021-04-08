import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import firebase from "firebase";

import Screen from "../components/Screen";
import ListItem from "../components/Lists/ListItem";
import colors from "../config/colors";
import Icon from "../components/Icon";
import ListItemSeparator from "../components/Lists/ListItemSeparator";

const menuItems = [
  {
    title: "My Mates",
    icon: {
      name: "nature-people",
      backgroundColor: colors.white,
      iconColor: colors.icon,
    },
  },
  {
    title: "Settings",
    icon: {
      name: "power-settings",
      backgroundColor: colors.white,
      iconColor: colors.icon,
    },
    TargetScreen: "Messages",
  },
];
export default function AccountScreen({ navigation }) {
  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => console.log("User signed out!"));
  };
  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <ListItem
          title="Ankit Das"
          subtitle="its.ankitdas@gmail.com"
          image={require("../assets/ankit.jpg")}
        />
      </View>
      <View style={styles.secondcontainer}>
        <FlatList
          data={menuItems}
          keyExtractor={(menuItem) => menuItem.title}
          ItemSeparatorComponent={ListItemSeparator}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              IconComponent={
                <Icon
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundColor}
                  iconColor={item.icon.iconColor}
                />
              }
              onPress={() => navigation.navigate(item.TargetScreen)}
            />
          )}
        />
      </View>
      <ListItem
        title="Logout"
        onPress={logout}
        IconComponent={
          <Icon name="logout" backgroundColor="#fff" iconColor={colors.icon} />
        }
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.white,
  },
  secondcontainer: {
    marginVertical: 40,
  },
});
