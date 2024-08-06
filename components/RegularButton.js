import { StyleSheet, Text, Pressable, View } from "react-native";
import React from "react";
import { colors } from "../helpers/Constants";

export default function RegularButton({
  children,
  onPress,
  childrenStyle,
  buttonStyle,
  buttonTextStyle,
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        pressed ? styles.pressed : null,
        buttonStyle,
      ]}
    >
      <View style={childrenStyle}>
        <Text style={[styles.buttonText, buttonTextStyle]}>{children}</Text>
      </View>
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
    justifyContent: "center",
  },
  pressed: {
    backgroundColor: colors.buttonPressedBackground,
  },
  buttonText: {
    color: colors.buttonTextColor,
    textAlign: "center",
  },
});
