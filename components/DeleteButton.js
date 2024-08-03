import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";

export default function DeleteButton({ onPress }) {
  return (
    <Pressable onPress={onPress}>
      <Text>X</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({});
