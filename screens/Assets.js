import { StyleSheet, Text, View, Platform, FlatList } from "react-native";
import React, { useEffect, useState, useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import DropDownMenu from "../components/DropDownMenu";
import RegularButton from "../components/RegularButton";
import AssetItem from "../components/AssetItem";
import AddButton from "../components/AddButton";
import { calculateTotal } from "../helpers/RatesHelper";

export default function Assets() {
  const navigation = useNavigation();
  const defaultBase = "CAD";
  const defaultAssets = [
    { currency: "USD", amount: "100", id: 1 },
    { currency: "CNY", amount: "200", id: 2 },
  ];
  const [base, setBase] = useState(defaultBase);
  const [assets, setAssets] = useState(defaultAssets);
  const [total, setTotal] = useState(0);
  const [newAsset, setNewAsset] = useState(null);

  useEffect(() => {
    const fetchTotal = async () => {
      const data = { base, assets };
      const total = await calculateTotal({ data });
      setTotal(total);
    };
    fetchTotal();
  }, [assets, setAssets, base]);

  // headerRight button
  // if pressed, add an empty asset
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <AddButton onPress={handleAdd} />,
    });
  }, [navigation]);

  useEffect(() => {
    if (newAsset) {
      setAssets((prevAssets) => [...prevAssets, newAsset]);
      setNewAsset(null); // reset newAsset after adding
    }
  }, [newAsset]);

  // when the user presses the headerRight add button, add an empty asset
  const handleAdd = () => {
    console.log("Assets.js 48, before add", assets);
    const newId = Math.random() * 10000;
    const addedAsset = { currency: "CAD", amount: "0", id: newId };
    setNewAsset(addedAsset);
  };

  // when base currency changes, update the base
  const baseHandler = (base) => {
    setBase(base);
  };

  const handleReset = () => {
    setBase(defaultBase);
    setAssets(defaultAssets);
    // and hide the add dropdown
    // setAddMode(false);
    // console.log("Assets.js 35, reset");
  };

  const handleSave = () => {
    console.log("Assets.js 49, save");
  };

  const handleDelete = (currency) => {
    const newAssets = assets.filter((asset) => asset.currency !== currency);
    setAssets(newAssets);
    // console.log("Assets.js 55, delete", currency);
  };

  //when the user changes the currency of an asset, update the currency
  const handleChangeCurrency = ({ id, newCurrency }) => {
    setAssets((prevAssets) =>
      prevAssets.map((asset) =>
        asset.id === id ? { ...asset, currency: newCurrency } : asset
      )
    );
    // console.log("Assets.js 65, change currency", newCurrency);
  };

  //when the user changes the amount of an asset, update the amount
  const handleChangeAmount = ({ id, newAmount }) => {
    setAssets((prevAssets) =>
      prevAssets.map((asset) =>
        asset.id === id ? { ...asset, amount: newAmount } : asset
      )
    );
    // console.log("Assets.js 75, new amount", newAmount);
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
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <AssetItem
              id={item.id}
              item={item}
              onDelete={() => handleDelete(item.currency)}
              onChangeCurrency={handleChangeCurrency}
              onChangeAmount={handleChangeAmount}
            />
          )}
          contentContainerStyle={styles.flatListContent}
        />
        <View style={styles.textContainer}>
          <Text>
            Total: {total} {base}
          </Text>
        </View>
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
    paddingBottom: 20,
  },
  flatListContent: {},
  textContainer: {
    // flex: 1,
    // justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    width: "80%",
    justifyContent: "space-around",
  },
});
