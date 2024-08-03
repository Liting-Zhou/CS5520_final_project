import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { colors } from "../helpers/Constants";

// a button for reset, save, submit, etc.
export default function RegularButton({ children, onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.button}>
      <Text style={styles.buttonText}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.buttonBackground,
    padding: 10,
    margin: 10,
    borderRadius: 5,
    height: 40,
  },
  buttonText: {
    color: colors.buttonTextColor,
    textAlign: "center",
  },
});
