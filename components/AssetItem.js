import { StyleSheet, Text, View, Platform } from "react-native";
import React from "react";

import DropDownMenu from "./DropDownMenu";
import Input from "./Input";
import DeleteButton from "./DeleteButton";

// the item has a currency and an amount, and a delete button
export default function AssetItem({
  id,
  item,
  onDelete,
  onChangeCurrency,
  onChangeAmount,
}) {
  const { currency, amount } = item;
  const handleChangeCurrency = (newCurrency) => {
    onChangeCurrency({ id, newCurrency });
  };

  const handleChangeAmount = (newAmount) => {
    onChangeAmount({ id, newAmount });
  };

  return (
    <View style={[styles.container, { zIndex: (10 - id) * 1000 }]}>
      <DeleteButton onPress={onDelete} style={styles.deleteButton} />
      <Input
        defaultValue={amount}
        style={styles.input}
        onChangeText={handleChangeAmount}
      />
      <DropDownMenu
        base={currency}
        style={[styles.dropdown]}
        onSelect={handleChangeCurrency}
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
    // position: "absolute",
  },
  input: { width: "25%", marginRight: 15, borderRadius: 8 },
  dropdown: { width: "60%", minHeight: 40 },
  deleteButton: { width: "10%" },
});
