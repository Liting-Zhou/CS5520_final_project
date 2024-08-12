import { StyleSheet, Text, View } from "react-native";
import React from "react";
import TrashBinButton from "./TrashBinButton";
import CustomText from "./CustomText";

// the item has a currency and a rate, and a delete button
export default function RateItem({ item, onPress }) {
  return (
    <View style={styles.container}>
      <CustomText>{item.currency}</CustomText>
      <CustomText>{item.rate}</CustomText>
      <TrashBinButton onPress={onPress} iconStyle={styles.deleteIcon} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "60%",
    margin: 5,
  },
  deleteIcon: { marginRight: 0 },
});
