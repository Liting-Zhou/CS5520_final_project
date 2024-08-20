import { StyleSheet, Text, Pressable } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { colors, textSizes } from "../helpers/ConstantsHelper";
import { useNavigation } from "@react-navigation/native";

// This is a notification item component, used in the Notifications component
export default function NotificationItem({ item, status }) {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate("AddNotification", { item });
  };

  // function to determine the background color of the notification item
  // based on the status of whether the notification is turned on or off
  const getBackgroundColor = (pressed) => {
    if (pressed) {
      return colors.lightGray;
    }
    if (status) {
      return colors.white;
    }
    return colors.transparentGray;
  };

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.container,
        { backgroundColor: getBackgroundColor(pressed) },
      ]}
      android_ripple={{ color: colors.lightGray }}
    >
      <AntDesign name="edit" size={24} color={colors.fourthTheme} />
      <Text style={status ? styles.activeText : styles.deactivatedText}>
        {item.from} to {item.to} exchange rate exceeds{" "}
        <Text style={{ fontWeight: "bold" }}>
          {Number(item.threshold).toFixed(4)}
        </Text>
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  activeText: {},
  deactivatedText: {
    color: colors.gray,
  },
});
