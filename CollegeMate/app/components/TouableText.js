import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";

import AppText from "./Text";

export default function TouableText({title, onPress, style }) {
  return (
      <TouchableOpacity onPress={onPress} style={style}>
        <AppText style={styles.text}>{title}</AppText>
      </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    text: {
        color: "white",
    }
})

