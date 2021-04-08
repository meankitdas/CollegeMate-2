import React from 'react'
import { View, StyleSheet, FlatList } from 'react-native'

import colors from "../config/colors";
import CategoryPicker from "../components/CategoryPicker";

export default function People() {
    const categories = [
        {
          label: "Ankit",
          value: 1,
          imageUri: require("../assets/ankit.jpg"),
        },
        {
          label: "Amlan",
          value: 2,
        },
        { label: "Raj", value: 3 },
        { label: "Lalita", value: 4 },
      ];

    return (
        <View style={styles.container}>
            <FlatList
          data={categories}
          keyExtractor={(item) => item.value.toString()}
          numColumns={2}
          renderItem={({ item }) => (
            <CategoryPicker
              item={item}
              label={item.label}
              onPress={() => console.log(item)}
            />
          )}
        />
        </View>
    )
}

const styles = StyleSheet.create({
    animations: {
      width: 500,
    },
    container: {
    //   alignItems: "center",
      flex: 1,
    //   justifyContent: "center",
    },
    text: {
      fontFamily: "Nunito_600SemiBold",
      color: colors.medium,
    },
    
  });