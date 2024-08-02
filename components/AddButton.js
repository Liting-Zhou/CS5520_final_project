import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function AddButton({ onPress }) {
  return (
    <Pressable onPress={onPress}>
      <Ionicons name="add" size={24} color="black" style={styles.icon} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  icon: {
    marginRight: 10,
  },
});
