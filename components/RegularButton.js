import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";

export default function RegularButton({ children, onPress }) {
  return <Pressable onPress={onPress}>{children}</Pressable>;
}

const styles = StyleSheet.create({});
