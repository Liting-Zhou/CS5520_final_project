import { StyleSheet, Text, View, Platform, FlatList } from "react-native";
import React, { useState } from "react";
import DropDownMenu from "../components/DropDownMenu";
import RegularButton from "../components/RegularButton";
import AssetItem from "../components/AssetItem";

export default function Assets() {
  const defaultBase = "CAD";
  const defaultAssets = [
    { currency: "USD", amount: "100" },
    { currency: "CNY", amount: "200" },
  ];
  const [base, setBase] = useState(defaultBase);
  const [assets, setAssets] = useState(defaultAssets);

  const baseHandler = (base) => {
    setBase(base);
  };
  const handleReset = () => {
    setBase(defaultBase);
    setAssets(defaultAssets);
    // and hide the add dropdown
    // setAddMode(false);
    console.log("Assets.js 20, reset");
  };
  const handleSave = () => {
    console.log("Assets.js 23, save");
  };
  const handleDelete = (currency) => {
    const newAssets = assets.filter((asset) => asset.currency !== currency);
    setAssets(newAssets);
    console.log("Assets.js 28, delete", currency);
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.baseContainer,
          Platform.OS === "ios" ? { zIndex: 1000 } : {},
        ]}
      >
        <Text>Base currency: </Text>
        <DropDownMenu onSelect={baseHandler} base={base} />
      </View>
      <View style={styles.listContainer}>
        <Text>Your currencies: </Text>
        <FlatList
          data={assets}
          renderItem={({ item }) => (
            <AssetItem
              item={item}
              onPress={() => handleDelete(item.currency)}
            />
          )}
          contentContainerStyle={styles.flatListContent}
        />
      </View>
      <View style={styles.buttonContainer}>
        <RegularButton onPress={handleReset}>Reset</RegularButton>
        <RegularButton onPress={handleSave}>Save</RegularButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  baseContainer: {
    flex: 1,
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  listContainer: {
    flex: 4,
    width: "80%",
  },
  // flatListContent: {
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    width: "80%",
    justifyContent: "space-around",
  },
});
