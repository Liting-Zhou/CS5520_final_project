import { StyleSheet, Text, View } from "react-native";
import React from "react";

import DropDownMenu from "./DropDownMenu";
import Input from "./Input";
import DeleteButton from "./DeleteButton";

// the item has a currency and an amount, and a delete button
export default function AssetItem({ item, onPress }) {
  const { currency, amount } = item;

  const handleChangeValue = (value) => {
    console.log("AssetItem.js 13, value", value);
  };
  return (
    <View style={styles.container}>
      <DeleteButton onPress={onPress} style={styles.deleteButton} />
      <Input defaultValue={amount} style={styles.input} />
      <DropDownMenu
        base={currency}
        style={styles.dropdown}
        onSelect={handleChangeValue}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingVertical: 10,
  },
  input: { width: "25%", marginRight: 15, borderRadius: 8 },
  dropdown: { width: "60%", minHeight: 40 },
  deleteButton: { width: "10%" },
});
