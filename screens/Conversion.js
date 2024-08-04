import { StyleSheet, Text, View, Platform } from "react-native";
import React from "react";
import DropDownMenu from "../components/DropDownMenu";

export default function Conversion() {
  const onSelect = (base) => {
    console.log("Conversion.js 6, base", base);
  };
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.baseContainer,
          Platform.OS === "ios" ? { zIndex: 2000 } : {},
        ]}
      >
        <Text style={styles.label}>From: </Text>
        <DropDownMenu onSelect={onSelect} />
      </View>
      <View
        style={[
          styles.baseContainer,
          Platform.OS === "ios" ? { zIndex: 1000 } : {},
        ]}
      >
        <Text style={styles.label}>To: </Text>
        <DropDownMenu onSelect={onSelect} />
      </View>
      <View style={styles.baseContainer}>
        <Text style={styles.label}>Amount: </Text>
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
    backgroundColor: "skyblue",
    paddingVertical: 10,
  },
  label: {
    marginRight: 10,
  },
});
