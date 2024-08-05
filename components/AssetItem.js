import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function AssetItem() {
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
