import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useState } from "react";
import { useIsFocused } from "@react-navigation/native";

import { colors, textSizes } from "../helpers/ConstantsHelper";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

export default function ConvertButton({ onPress }) {
  const isFocused = useIsFocused();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.convertButton,
        isFocused ? styles.focused : styles.inactive,
        pressed ? styles.pressed : null,
      ]}
    >
      <FontAwesome5
        name="exchange-alt"
        size={textSizes.iconSize}
        color={colors.white}
      />
      <Text style={styles.textStyle}>Convert</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  convertButton: {
    top: -23,
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  focused: {
    backgroundColor: colors.secondTheme,
  },
  inactive: {
    backgroundColor: colors.firstTheme,
  },
  pressed: {
    // opacity: 0.5,
  },
  textStyle: {
    fontSize: textSizes.small,
    color: colors.white,
  },
});
