import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Input from "./Input";
import { colors } from "../helpers/ConstantsHelper";
import CustomModal from "./CustomModal";
import TrashBinButton from "./TrashBinButton";

// this component is used in the Assets component
// the item has a currency and an amount, and a delete button
export default function AssetItem({
  id,
  item,
  onDelete,
  onChangeCurrency,
  onChangeAmount,
  filterItems,
}) {
  const { currency, amount } = item;
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleChangeCurrency = (newCurrency) => {
    onChangeCurrency({ id, newCurrency });
    setModalVisible(false);
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
      <Pressable
        onPress={toggleModal}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.pressedButton,
        ]}
      >
        <View style={styles.buttonContent}>
          <Text>{currency}</Text>
          <MaterialIcons name="mode-edit" size={24} color="black" />
        </View>
      </Pressable>
      <CustomModal
        isModalVisible={isModalVisible}
        valuePassed={currency}
        handleValueChange={handleChangeCurrency}
        handleModalClose={toggleModal}
        title="Change a currency"
        filterItems={filterItems.filter(
          (filterItem) => filterItem !== currency
        )}
      ></CustomModal>
      <TrashBinButton
        onPress={onDelete}
        customStyle={styles.deleteButton}
        iconStyle={styles.deleteIcon}
      />
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
  button: {},
  pressedButton: { opacity: 0.5 },

  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.buttonBackground,
    paddingHorizontal: 10,
    borderRadius: 8,
    height: 40,
  },

  input: { width: "30%", marginRight: 15, borderRadius: 8 },
  deleteButton: { marginLeft: 15 },
  deleteIcon: { marginRight: 0 },
});
