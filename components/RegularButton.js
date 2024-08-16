import { StyleSheet, Text, Pressable, View } from "react-native";
import React from "react";
import { colors } from "../helpers/ConstantsHelper";
import CustomText from "./CustomText";

export default function RegularButton({
  children,
  onPress,
  childrenStyle,
  buttonStyle,
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
        <CustomText style={styles.buttonText}>{children}</CustomText>
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
    minWidth: 80,
  },
  pressed: {
    backgroundColor: colors.buttonPressedBackground,
  },
  buttonText: {
    color: colors.white,
    textAlign: "center",
  },
});
