import { StyleSheet, Text, View, FlatList, Platform } from "react-native";
import React, { useEffect, useState, useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import DropDownMenu from "../components/DropDownMenu";
import RateItem from "../components/RateItem";
import { getSelectedCurrencies } from "../helpers/RatesHelper";
import RegularButton from "../components/RegularButton";
import AddButton from "../components/AddButton";
import CustomModal from "../components/CustomModal";
import {
  readCurrenciesFromDB,
  writeCurrenciesToDB,
} from "../firebase/firebaseHelper";

export default function Rates() {
  const navigation = useNavigation();
  const defaultCurrencies = ["USD", "EUR", "JPY"];
  const defaultBase = "CAD";
  const [base, setBase] = useState(defaultBase);
  const [selectedCurrencies, setSelectedCurrencies] =
    useState(defaultCurrencies);
  const [rates, setRates] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);

  // todo: fetch selected currencies when the component mounts if loggin
  useEffect(() => {
    const fetchSelectedCurrencies = async () => {
      try {
        const userId = "User1";
        const data = await readCurrenciesFromDB(userId, "users");
        if (data) {
          // console.log("Rates.js 33, data from DB", data);
          setBase(data.base);
          setSelectedCurrencies(data.selectedCurrencies);
          return;
        }
      } catch (error) {
        console.error("Error fetching selected currencies: ", error);
      }
    };
    fetchSelectedCurrencies();
  }, []);

  // update whenever the base currency or the selected currencies change
  useEffect(() => {
    const fetchRates = async () => {
      const data = { base, selectedCurrencies };
      const rates = await getSelectedCurrencies({ data });
      setRates(rates);
      // console.log("Rates.js 29, rates", rates);
    };
    fetchRates();
  }, [base, selectedCurrencies]);

  // headerRight button to add a currency
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <AddButton onPress={handleAdd} />,
    });
  }, [navigation]);

  // when press the headerRight add button, show the Modal to add a currency
  const handleAdd = () => {
    setModalVisible(true);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // when the user selects a base currency, update the base
  const baseHandler = (base) => {
    setBase(base);
  };

  // when the user presses the delete button, remove the currency from the list
  const handleDelete = (currency) => {
    const newRates = rates.filter((rate) => rate.currency !== currency);
    setRates(newRates);
    setSelectedCurrencies(selectedCurrencies.filter((c) => c !== currency));
  };

  // reset the rates to the default rates
  const handleReset = () => {
    setBase(defaultBase);
    setSelectedCurrencies(defaultCurrencies);
  };

  // save the rates to the database
  const handleSave = async () => {
    console.log("Saving rates");
    try {
      const userId = "User1";
      await writeCurrenciesToDB({ userId, base, selectedCurrencies }, "users");
    } catch (error) {
      console.error("Error saving rates: ", error);
    }
  };

  // add the currency to the list after select
  const addCurrencyAfterSelect = (currency) => {
    setSelectedCurrencies([...selectedCurrencies, currency]);
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
        <FlatList
          data={rates}
          renderItem={({ item }) => (
            <RateItem item={item} onPress={() => handleDelete(item.currency)} />
          )}
          contentContainerStyle={styles.flatListContent}
        />
      </View>
      <CustomModal
        isModalVisible={isModalVisible}
        onBackdropPress={toggleModal}
        valuePassed={""}
        handleValueChange={addCurrencyAfterSelect}
      ></CustomModal>
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
  flatListContent: {
    alignItems: "center",
    justifyContent: "center",
  },

  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    width: "80%",
    justifyContent: "space-around",
  },
});
