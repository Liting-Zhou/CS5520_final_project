import { StyleSheet, Text, View, Modal, Pressable } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import DropDownPicker from "react-native-dropdown-picker";
import React, { useState } from "react";
import { currencies, colors, textSizes } from "../helpers/ConstantsHelper";

// this Modal is used to pop up a dropdown picker to select a currency
export default function CustomModal({
  isModalVisible,
  valuePassed,
  handleValueChange,
  handleModalClose,
  title,
  filterItems,
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(valuePassed);

  // filter out the items that are already selected
  const [items, setItems] = useState(() => {
    // console.log("CustomModal.js 21, filterItems", filterItems);
    // console.log("CustomModal.js 22, valuePassed", valuePassed);
    const filteredItems = filterItems
      ? currencies.filter((currency) => !filterItems.includes(currency.value))
      : currencies;
    return filteredItems;
  });

  const modalCloseHandler = () => {
    setOpen(false);
    handleModalClose();
  };

  return (
    <Modal transparent={true} visible={isModalVisible} animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Pressable
            onPress={modalCloseHandler}
            style={styles.deleteButtonInModal}
            pressRetentionOffset={{ top: 20, left: 20, right: 20, bottom: 20 }}
          >
            <FontAwesome6 name="times-circle" size={24} color="black" />
          </Pressable>
          <Text style={styles.textStyle}>{title}</Text>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            searchable={true}
            searchPlaceholder="Search..."
            onChangeValue={(newValue) => {
              handleValueChange(newValue);
            }}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.modalOverlay,
  },

  modalContent: {
    width: "80%",
    backgroundColor: colors.thirdTheme,
    padding: 20,
    borderRadius: 10,
    // justifyContent: "center",
    alignItems: "center",
  },
  deleteButtonInModal: {
    position: "absolute",
    top: 5,
    right: 5,
    zIndex: 10000,
    backgroundColor: colors.thirdTheme,
  },
  textStyle: {
    fontSize: textSizes.medium,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
