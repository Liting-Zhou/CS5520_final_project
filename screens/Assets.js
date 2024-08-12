import {
  StyleSheet,
  Text,
  View,
  Platform,
  FlatList,
  Alert,
} from "react-native";
import React, { useEffect, useState, useLayoutEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";

import DropDownMenu from "../components/DropDownMenu";
import RegularButton from "../components/RegularButton";
import AssetItem from "../components/AssetItem";
import AddButton from "../components/AddButton";

import { calculateTotal } from "../helpers/RatesHelper";
import { colors } from "../helpers/ConstantsHelper";
import { positiveNumberChecker } from "../helpers/Checker";
import { readAssetsFromDB, writeAssetsToDB } from "../firebase/firebaseHelper";
import { auth } from "../firebase/firebaseSetup";

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
  const flatListRef = useRef(null);
  const [currentUser, setCurrentUser] = useState(null);

  // fetch customized assets when the component mounts if loggin
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setCurrentUser(user);
      if (user) {
        console.log("Assets.js 42, user is logged in");
        fetchAssets(user.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  // calculate the total when assets or base change
  useEffect(() => {
    // check if the amounts are all positive numbers
    for (let asset of assets) {
      if (!positiveNumberChecker(asset.amount)) {
        return;
      }
    }
    const fetchTotal = async () => {
      const data = { base, assets };
      const total = await calculateTotal({ data });
      setTotal(total);
    };
    fetchTotal();
  }, [assets, base]);

  // scroll the list to the bottom when assets change
  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [assets]);

  // headerRight button
  // if pressed, add an empty asset
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <AddButton onPress={handleAdd} />,
    });
  }, [navigation]);

  // when a new asset is added, add it to the list
  useEffect(() => {
    if (newAsset) {
      setAssets((prevAssets) => [...prevAssets, newAsset]);
      setNewAsset(null); // reset newAsset after adding
    }
  }, [newAsset]);

  // fetch base and assets from the database
  const fetchAssets = async (id) => {
    try {
      console.log("Assets.js 96, user id", id);
      const data = await readAssetsFromDB(id, "users");
      if (data) {
        console.log("Assets.js 99, data from DB", data);
        setBase(data.base);
        setAssets(data.assets);
      } else {
        setBase(defaultBase);
        setAssets(defaultAssets);
      }
    } catch (error) {
      console.error("Error fetching assets: ", error);
    }
  };

  // when the user presses the headerRight add button, add an empty asset
  const handleAdd = () => {
    // console.log("Assets.js 58, before add", assets);
    const newGeneratedId = Math.random() * 1000;
    const addedAsset = { currency: "CAD", amount: "0", id: newGeneratedId };
    setNewAsset(addedAsset);
  };

  // when base currency changes, update the base
  const baseHandler = (base) => {
    setBase(base);
  };

  //todo: if loggin, retrieve the customized assets from the database
  const handleReset = () => {
    setBase(defaultBase);
    setAssets(defaultAssets);
  };

  const handleSave = async () => {
    console.log("Assets.js 103, saving assets");
    try {
      await writeAssetsToDB({ userId: "User1", base, assets }, "users");
      Alert.alert("", "Your assets have been saved successfully!");
    } catch (error) {
      Alert.alert("", "Failed to save assets. Please try again later.");
    }
  };

  const handleDelete = (id) => {
    const newAssets = assets.filter((asset) => asset.id !== id);
    setAssets(newAssets);
  };

  //when the user changes the currency of an asset, update the currency
  const handleChangeCurrency = ({ id, newCurrency }) => {
    setAssets((prevAssets) =>
      prevAssets.map((asset) =>
        asset.id === id ? { ...asset, currency: newCurrency } : asset
      )
    );
    // console.log("Assets.js 90, change currency", newCurrency);
  };

  //when the user changes the amount of an asset, update the amount
  const handleChangeAmount = ({ id, newAmount }) => {
    setAssets((prevAssets) =>
      prevAssets.map((asset) =>
        asset.id === id ? { ...asset, amount: newAmount } : asset
      )
    );
    // console.log("Assets.js 100, new amount", newAmount);
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
          ref={flatListRef}
          data={assets}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <AssetItem
              id={item.id}
              item={item}
              onDelete={() => handleDelete(item.id)}
              onChangeCurrency={handleChangeCurrency}
              onChangeAmount={handleChangeAmount}
            />
          )}
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
    backgroundColor: colors.thirdTheme,
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

  textContainer: {
    alignItems: "center",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    width: "80%",
    justifyContent: "space-around",
  },
});
