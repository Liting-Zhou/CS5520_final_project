import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { currencies } from "../helpers/Constants";

export default function DropDownMenu() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("CAD");
  const [items, setItems] = useState(currencies);

  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      searchable={true}
      searchPlaceholder="Search..."
      style={styles.dropdown}
    />
  );
}

const styles = StyleSheet.create({
  dropdown: { width: "70%" },
});
