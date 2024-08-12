import { StyleSheet, Pressable } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors } from "../helpers/ConstantsHelper";

export default function AddButton({ onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.icon, { opacity: pressed ? 0.5 : 1 }]}
      android_ripple={{ color: colors.lightGray }}
      pressRetentionOffset={{ top: 10, left: 10, right: 10, bottom: 10 }}
    >
      <Ionicons name="add" size={24} color="black" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  icon: {
    marginRight: 10,
  },
});
