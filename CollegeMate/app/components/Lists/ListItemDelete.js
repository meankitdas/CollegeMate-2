import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";

import colors from "../../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function ListItemDelete({ onPress }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <MaterialCommunityIcons name="trash-can" color="white" size={30} />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.danger,
    width: 70,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    marginBottom: 15

  },
});

export default ListItemDelete;
