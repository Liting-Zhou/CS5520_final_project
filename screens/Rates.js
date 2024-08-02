import { StyleSheet, Text, View, FlatList, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import DropDownMenu from "../components/DropDownMenu";
import RateItem from "../components/RateItem";
import { getSelectedCurrencies } from "../helpers/CachedLatestRates";

export default function Rates() {
  const [base, setBase] = useState("CAD");
  const [selectedCurrencies, setSelectedCurrencies] = useState([
    "USD",
    "EUR",
    "JPY",
  ]);
  const [rates, setRates] = useState([]);

  useEffect(() => {
    const fetchRates = async () => {
      const data = { base, selectedCurrencies };
      const rates = await getSelectedCurrencies({ data });
      setRates(rates);
      // console.log("Rates.js 21, rates", rates);
    };
    fetchRates();
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.baseContainer,
          Platform.OS === "ios" ? { zIndex: 1000 } : {},
        ]}
      >
        <Text>Base currency: </Text>
        <DropDownMenu />
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={rates}
          renderItem={({ item }) => <RateItem item={item} />}
          contentContainerStyle={styles.flatListContent}
        />
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
    // alignItems: "center",
    // justifyContent: "center",
  },
  flatListContent: {
    // width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
