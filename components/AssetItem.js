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
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
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
  const [value, setValue] = useState(currency);
  const [items, setItems] = useState(currencies);

  const toggleModal = () => {
    // console.log("toggleModal");
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
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Pressable onPress={toggleModal} style={styles.deleteButtonInModal}>
              <FontAwesome6 name="times-circle" size={24} color="black" />
            </Pressable>
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
                handleChangeCurrency(newValue);
                toggleModal();
              }}
            />
          </View>
        </View>
      </Modal>
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
  },

  currencyButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.buttonBackground,
    paddingHorizontal: 10,
    borderRadius: 8,
    height: 40,
  },
  input: { width: "30%", marginRight: 15, borderRadius: 8 },

  deleteButton: { marginLeft: 15 },

  deleteButtonInModal: {
    position: "absolute",
    top: 5,
    right: 5,
    zIndex: 10000,
    backgroundColor: colors.white,
  },

  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.modalOverlay,
  },

  modalContent: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
});
