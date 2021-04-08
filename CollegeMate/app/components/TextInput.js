import React from "react";
import { View, StyleSheet, TextInput } from "react-native";

import { MaterialCommunityIcons, Foundation   } from "@expo/vector-icons";

import colors from "../config/colors";
import defaultStyles from "../config/styles";

export default function AppTextInput({ icon, style, secondIcon,width, ...otherProps }) {
  return (
    <View style={[styles.container, {width}]}>
      <View style={styles.iconContainer}>
        {secondIcon &&(
          <Foundation 
            name={secondIcon}
            size={20}
            color={colors.medium}
            style={styles.icon}
          />
        )}
        {icon && (
          <MaterialCommunityIcons
            name={icon}
            size={20}
            color={colors.medium}
            style={styles.icon}
          />
        )}
      </View>
      <TextInput placeholderTextColor={colors.medium} style={[defaultStyles.text, style]} {...otherProps} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    borderRadius: 25,
    flexDirection: "row",
    padding: 15,
    marginVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
