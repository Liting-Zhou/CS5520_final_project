import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { textSizes } from "../helpers/ConstantsHelper";

// It is easier to maintain the text sizes in one place
export default function CustomText({ children, style }) {
  return <Text style={[styles.text, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontSize: textSizes.medium,
  },
});
