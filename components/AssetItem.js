import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Input from "./Input";
import DeleteButton from "./DeleteButton";
import { colors } from "../helpers/Constants";
import CustomModal from "./CustomModal";

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

  const toggleModal = () => {
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
          <Text>{currency}</Text>
          <MaterialIcons name="mode-edit" size={24} color="black" />
        </View>
      </Pressable>
      <CustomModal
        isModalVisible={isModalVisible}
        onBackdropPress={toggleModal}
        valuePassed={currency}
        handleValueChange={handleChangeCurrency}
      ></CustomModal>
      <DeleteButton onPress={onDelete} style={styles.deleteButton} />
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
});
