import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Platform,
  Alert,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useState, useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import RegularButton from "../components/RegularButton";
import AddButton from "../components/AddButton";
import CustomModal from "../components/CustomModal";
import DropDownMenu from "../components/DropDownMenu";
import RateItem from "../components/RateItem";

import { getSelectedCurrencies } from "../helpers/RatesHelper";
import { colors } from "../helpers/ConstantsHelper";

import {
  readCurrenciesFromDB,
  writeCurrenciesToDB,
} from "../firebase/firebaseHelper";
import { auth } from "../firebase/firebaseSetup";
import CustomText from "../components/CustomText";

export default function Rates() {
  const navigation = useNavigation();
  const defaultCurrencies = ["USD", "EUR", "JPY"];
  const defaultBase = "CAD";
  const [base, setBase] = useState(defaultBase);
  const [selectedCurrencies, setSelectedCurrencies] =
    useState(defaultCurrencies);
  const [rates, setRates] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  //if the user is logged in, fetch the selected currencies from the database
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setCurrentUser(user);
      if (user) {
        // console.log("Rates.js 42, user is logged in");
        fetchSelectedCurrencies(user.uid);
      }
    });
    return () => unsubscribe();
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

  // fetch base and selected currencies from the database
  const fetchSelectedCurrencies = async (id) => {
    try {
      // console.log("Rates.js 70, user id", id);
      const data = await readCurrenciesFromDB(id, "users");
      if (data) {
        // console.log("Rates.js 73, data from DB", data);
        setBase(data.base);
        setSelectedCurrencies(data.selectedCurrencies);
      } else {
        setBase(defaultBase);
        setSelectedCurrencies(defaultCurrencies);
      }
    } catch (error) {
      console.error("Error fetching selected currencies: ", error);
    }
  };

  // when press the headerRight add button, show the Modal to add a currency
  const handleAdd = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
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
  // when loggin, fetch rates from the database
  const handleReset = () => {
    console.log("Resetting rates");
    if (currentUser === null) {
      setBase(defaultBase);
      setSelectedCurrencies(defaultCurrencies);
    } else {
      fetchSelectedCurrencies(currentUser.uid);
    }
  };

  // save the rates to the database
  const handleSave = async () => {
    console.log("Saving rates");
    // if not login, alert user and navigate to the profile screen
    if (currentUser === null) {
      Alert.alert("", "Please log in to save your list.", [
        {
          text: "OK",
          onPress: () => navigation.navigate("Profile"),
        },
      ]);
    } else {
      //for login user, save the customized list to database
      try {
        await writeCurrenciesToDB(
          { userId: currentUser.uid, base, selectedCurrencies },
          "users"
        );
        Alert.alert("", "Your list has been saved successfully!");
      } catch (error) {
        Alert.alert("", "Failed to save list. Please try again later.");
      }
    }
  };

  // add the currency to the list after select
  const addCurrencyAfterSelect = (currency) => {
    setSelectedCurrencies([...selectedCurrencies, currency]);
    setModalVisible(false);
  };

  const handleOutsidePress = () => {
    if (dropdownOpen) {
      setDropdownOpen(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
      <View style={styles.container}>
        <View
          style={[
            styles.baseContainer,
            Platform.OS === "ios" ? { zIndex: 1000 } : {},
          ]}
        >
          <CustomText>Base currency: </CustomText>
          <DropDownMenu
            onSelect={baseHandler}
            base={base}
            setOpen={setDropdownOpen}
            open={dropdownOpen}
          />
        </View>
        <View style={styles.listContainer}>
          <FlatList
            data={rates}
            renderItem={({ item }) => (
              <RateItem
                item={item}
                onPress={() => handleDelete(item.currency)}
              />
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.flatListContent}
            scrollEnabled={true}
          />
        </View>
        <CustomModal
          isModalVisible={isModalVisible}
          valuePassed={""}
          handleValueChange={addCurrencyAfterSelect}
          handleModalClose={closeModal}
          title="Add a currency"
        ></CustomModal>
        <View style={styles.buttonContainer}>
          <RegularButton onPress={handleReset}>Reset</RegularButton>
          <RegularButton onPress={handleSave}>Save</RegularButton>
        </View>
      </View>
    </TouchableWithoutFeedback>
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
