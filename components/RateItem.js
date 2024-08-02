import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function RateItem({ item }) {
  return (
    <View style={styles.container}>
      <Text style={styles.currency}>{item.currency}</Text>
      <Text style={styles.rate}>{item.rate}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
});
