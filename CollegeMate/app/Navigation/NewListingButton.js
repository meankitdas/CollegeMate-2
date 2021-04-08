import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import {MaterialIcons } from "@expo/vector-icons"

import colors from '../config/colors'

export default function NewListingButton({onPress}) {
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
        <View style={styles.container}>
            <MaterialIcons  name="search" color={colors.white} size={30}/>
        </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.secondary,
        borderRadius: 40,
        height: 80,
        width: 80,
        bottom: 40,
        borderWidth: 10,
        borderColor: colors.white,
        alignItems: "center",
        justifyContent: "center"
    }
})