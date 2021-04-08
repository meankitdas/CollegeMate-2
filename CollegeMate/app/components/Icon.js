import React from 'react'
import { View, Image, StyleSheet } from 'react-native'

import {MaterialCommunityIcons, Ionicons } from "@expo/vector-icons"


function icon({name,extra=false,  size=40, backgroundColor="#000", iconColor="#fff", imageUri}) {
    return (
        <View style={{
            width: size,
            height: size,
            borderRadius: size/2,
            backgroundColor,
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            {!extra && <MaterialCommunityIcons name={name} color={iconColor} size={size*0.5}/>}
            {extra && <Ionicons name={name} color={iconColor} size={size*0.5}/>}
            {imageUri && <Image style={styles.image} source={imageUri} />}
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        height: 80,
        width: 80,
        borderRadius: 50,
      },
  });

export default icon;