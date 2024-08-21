import React from "react";
import { StyleSheet, Pressable } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { colors } from "../helpers/ConstantsHelper";

// This component is a reusable trash bin button
export default function TrashBinButton({ onPress, customStyle, iconStyle }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }, customStyle]}
      android_ripple={{ color: colors.lightGray }}
    >
      <AntDesign
        name="delete"
        size={24}
        color="black"
        style={[styles.icon, iconStyle]}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  icon: {
    marginRight: 15,
  },
});
