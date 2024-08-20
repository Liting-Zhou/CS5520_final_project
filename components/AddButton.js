import { StyleSheet, Pressable } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors, textSizes } from "../helpers/ConstantsHelper";

// This is an add button usually used on the header right of screens
export default function AddButton({ onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.icon, { opacity: pressed ? 0.5 : 1 }]}
      android_ripple={{ color: colors.lightGray }}
      pressRetentionOffset={{ top: 20, left: 20, right: 20, bottom: 20 }}
    >
      <Ionicons name="add" size={textSizes.iconSize} color="black" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  icon: {
    marginRight: 10,
  },
});
