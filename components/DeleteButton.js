import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function DeleteButton({ onPress, style }) {
  return (
    <Pressable onPress={onPress} style={style}>
      <MaterialIcons name="delete-outline" size={24} color="black" />
    </Pressable>
  );
}

const styles = StyleSheet.create({});
