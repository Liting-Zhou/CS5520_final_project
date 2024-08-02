import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { currencies, colors } from "../helpers/Constants";

export default function DropDownMenu({ base, baseHandler }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("CAD");
  const [items, setItems] = useState(currencies);

  useEffect(() => {
    setValue(base);
  }, [base]);

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
      dropDownContainerStyle={styles.dropDownContainer}
      onChangeValue={(newValue) => baseHandler(newValue)}
    />
  );
}

const styles = StyleSheet.create({
  dropdown: { width: "70%" },
  dropDownContainer: {
    width: "70%",
    backgroundColor: colors.white,
  },
});
