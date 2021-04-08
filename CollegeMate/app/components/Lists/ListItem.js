import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableHighlight,
} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons"

import AppText from "../Text";
import colors from "../../config/colors";

import Swipeable from "react-native-gesture-handler/Swipeable";

function ListItem({ image, title, subtitle, onPress, IconComponent, renderRightActions }) {
  return (
    <Swipeable renderRightActions={renderRightActions}>
      <View style={styles.mainContainer}>
      <TouchableHighlight underlayColor={colors.light} onPress={onPress}>
        <View style={styles.container}>
          {IconComponent}
          {image && <Image style={styles.image} source={image} />}
          <View style={styles.detailContainer}>
            <AppText style={styles.title} numberOfLines={1}>{title}</AppText>
            {subtitle && <AppText style={styles.subtitle} numberOfLines={2}>{subtitle}</AppText>}
          </View>
          <MaterialCommunityIcons 
            color={colors.medium}
            name="chevron-right"
            size={25}
          />
        </View>
      </TouchableHighlight>
      </View>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: colors.extra,
    alignItems: "center",
    borderRadius: 15
  },
  image: {
    height: 70,
    width: 70,
    borderRadius: 35,
  },
  detailContainer: {
    marginLeft: 10,
    justifyContent: "center",
    flex: 1,
  },
  title: {
    fontWeight: "600",
  },
  subtitle: {
    color: colors.medium,
    fontSize: 15,
  },
  mainContainer: {
    marginBottom: 15,
    marginLeft: 5,
    marginRight: 5,
  }
});

export default ListItem;
