import { StyleSheet, TextInput } from "react-native";
import React from "react";
import colors from "../helpers/Constants";

export default function Input({ onChangeText, style, defaultValue }) {
  return (
    <TextInput
      style={[styles.input, style]}
      onChangeText={onChangeText}
      defaultValue={defaultValue}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    width: "50%",
  },
});
