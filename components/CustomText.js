import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { textSizes } from "../helpers/ConstantsHelper";

export default function CustomText({ children, style }) {
  return <Text style={[styles.text, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontSize: textSizes.medium,
  },
});
