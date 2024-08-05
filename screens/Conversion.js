import { StyleSheet, Text, View, Platform } from "react-native";
import React, { useState } from "react";
import DropDownMenu from "../components/DropDownMenu";
import Input from "../components/Input";
import RegularButton from "../components/RegularButton";
import { convert } from "../helpers/RatesHelper";

export default function Conversion() {
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState(0);

  const onSelectFrom = (rate) => {
    setFrom(rate);
    console.log("Conversion.js 18, from", rate);
  };
  const onSelectTo = (rate) => {
    setTo(rate);
    console.log("Conversion.js 22, to", rate);
  };
  const handleAmount = (amount) => {
    setAmount(amount);
    console.log("Conversion.js 26, amount", amount);
  };
  const handleSubmit = async () => {
    const result = await convert({ data: { from, to, amount } });
    setConvertedAmount(result);
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.itemContainer,
          Platform.OS === "ios" ? { zIndex: 2000 } : {},
        ]}
      >
        <Text style={styles.label}>From: </Text>
        <DropDownMenu onSelect={onSelectFrom} />
      </View>
      <View
        style={[
          styles.itemContainer,
          Platform.OS === "ios" ? { zIndex: 1000 } : {},
        ]}
      >
        <Text style={styles.label}>To: </Text>
        <DropDownMenu onSelect={onSelectTo} />
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.label}>Amount: </Text>
        <Input onChangeText={handleAmount}></Input>
      </View>
      <View style={styles.itemContainer}>
        <RegularButton onPress={handleSubmit}>Submit</RegularButton>
      </View>
      <View style={styles.itemContainer}>
        <Text>
          Result: {convertedAmount} {to}
        </Text>
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
  itemContainer: {
    flex: 1,
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "skyblue",
    paddingVertical: 10,
  },
  label: {
    marginRight: 10,
  },
});
