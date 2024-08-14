import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import TrashBinButton from "./TrashBinButton";
import { colors, textSizes } from "../helpers/ConstantsHelper";

export default function NotificationItem({ item }) {
  return (
    <View style={styles.container}>
      <AntDesign name="tago" size={24} color={colors.fourthTheme} />
      <Text>
        {item.from} to {item.to} exchange rate exceeds{" "}
        <Text style={{ fontWeight: "bold" }}>
          {Number(item.threshold).toFixed(4)}
        </Text>
      </Text>
    </View>
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
});
