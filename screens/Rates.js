import { StyleSheet, Text, View } from "react-native";
import React from "react";
import DropDownMenu from "../components/DropDownMenu";

export default function Rates() {
  const rates = [
    { currency: "USD", rate: 1.0 },
    { currency: "EUR", rate: 0.85 },
    { currency: "JPY", rate: 110.0 },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.baseContainer}>
        <Text>Base currency: </Text>
        <DropDownMenu />
      </View>
      <View style={styles.list}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
  },
  baseContainer: {
    flex: 1,
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // padding: 10,
  },
  list: {},
});
