import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";

export default function DeleteButton({ onPress, style }) {
  return (
    <Pressable onPress={onPress} style={style}>
      <Text>X</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({});
