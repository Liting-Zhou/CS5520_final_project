import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { colors } from "../helpers/constants";

export default function TabBarButton({ children, onPress }) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <View style={styles.children}>{children}</View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    color: colors.white,
    justifyContent: "center",
    top: -10,
  },
  children: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: colors.tabBarbutton,
    justifyContent: "center",
    alignItems: "center",
  },
});
