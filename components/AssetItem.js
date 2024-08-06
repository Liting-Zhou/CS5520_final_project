import {
  StyleSheet,
  Text,
  View,
  Platform,
  Modal,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import DropDownMenu from "./DropDownMenu";
import Input from "./Input";
import DeleteButton from "./DeleteButton";
import RegularButton from "./RegularButton";
import { currencies, colors } from "../helpers/Constants";

// the item has a currency and an amount, and a delete button
export default function AssetItem({
  id,
  item,
  onDelete,
  onChangeCurrency,
  onChangeAmount,
}) {
  const { currency, amount } = item;
  const [isModalVisible, setModalVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(item.currency);
  const [items, setItems] = useState(currencies);

  const toggleModal = () => {
    console.log("toggleModal");
    setModalVisible(!isModalVisible);
  };
  const handleChangeCurrency = (newCurrency) => {
    onChangeCurrency({ id, newCurrency });
  };

  const handleChangeAmount = (newAmount) => {
    onChangeAmount({ id, newAmount });
  };

  return (
    <View style={[styles.container]}>
      <Input
        defaultValue={amount}
        style={styles.input}
        onChangeText={handleChangeAmount}
      />
      <Pressable onPress={toggleModal}>
        <View style={styles.currencyButton}>
          <Text>{value}</Text>
          <MaterialIcons name="mode-edit" size={24} color="black" />
        </View>
      </Pressable>
      <DeleteButton onPress={onDelete} style={styles.deleteButton} />

      <Modal
        transparent={true}
        visible={isModalVisible}
        onBackdropPress={toggleModal}
        animationType="slide"
        // style={styles.modalStyle}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              onChangeValue={(newValue) => {
                handleChangeCurrency(newValue);
                toggleModal();
              }}
            />
          </View>
        </View>
      </Modal>
      {/* <DropDownMenu
        base={currency}
        style={[styles.dropdown]}
        onSelect={handleChangeCurrency}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingVertical: 10,
    // backgroundColor: colors.buttonBackground,
  },
  currencyButton: {
    flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.buttonBackground,
    paddingHorizontal: 10,
    borderRadius: 8,
    height: 40,
    // width: "25%",
  },
  input: { width: "25%", marginRight: 15, borderRadius: 8 },
  // dropdown: { width: "60%", minHeight: 40 },
  deleteButton: { width: "10%", marginLeft: 15 },

  button: {
    padding: 10,
    backgroundColor: "#007BFF",
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "#FFF",
    textAlign: "center",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  // modalStyle: {
  //   width: "80%",
  //   height: "50%",
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  modalContent: {
    // justifyContent: "center",
    // alignItems: "center",
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
});
