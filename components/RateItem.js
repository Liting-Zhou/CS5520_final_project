import { StyleSheet, Text, View } from "react-native";
import React from "react";
import DeleteButton from "./DeleteButton";

// the item has a currency and a rate, and a delete button
export default function RateItem({ item, onPress }) {
  return (
    <View style={styles.container}>
      <Text style={styles.currency}>{item.currency}</Text>
      <Text style={styles.rate}>{item.rate}</Text>
      <DeleteButton onPress={onPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "50%",
  },
});
