import React from "react";
import { StyleSheet, View, Pressable } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { colors, textSizes } from "../helpers/ConstantsHelper";

const ProfilePressable = ({ onPress, children }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        pressed ? styles.pressed : null,
      ]}
    >
      <View style={styles.content}>{children}</View>
      <FontAwesome
        name="chevron-right"
        size={textSizes.small}
        color={colors.gray}
        style={styles.chevron}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.profilePressableBackground,
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 5,
    elevation: 3,
    width: "90%",
    marginVertical: 10,
  },
  pressed: {
    backgroundColor: colors.profilePressableFeedback,
  },
  content: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  chevron: {
    marginLeft: "auto",
  },
});

export default ProfilePressable;
