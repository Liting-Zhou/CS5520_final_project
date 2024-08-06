import { StyleSheet, Text, View } from "react-native";
import React from "react";
import TrashBinButton from "./TrashBinButton";

// the item has a currency and a rate, and a delete button
export default function RateItem({ item, onPress }) {
  return (
    <View style={styles.container}>
      <Text style={styles.currency}>{item.currency}</Text>
      <Text style={styles.rate}>{item.rate}</Text>
      <TrashBinButton onPress={onPress} iconStyle={styles.deleteIcon} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "50%",
    margin: 2,
  },
  deleteIcon: { marginRight: 0 },
});
