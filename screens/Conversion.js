import {
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";

import DropDownMenu from "../components/DropDownMenu";
import Input from "../components/Input";
import RegularButton from "../components/RegularButton";
import CustomText from "../components/CustomText";

import { convert } from "../helpers/RatesHelper";
import { positiveNumberChecker } from "../helpers/Checker";
import { colors } from "../helpers/ConstantsHelper";

export default function Conversion() {
  const [convertedAmount, setConvertedAmount] = useState("");
  const [from, setFrom] = useState("CAD");
  const [to, setTo] = useState("USD");
  const [amount, setAmount] = useState("");
  const [openFrom, setOpenFrom] = useState(false);
  const [openTo, setOpenTo] = useState(false);

  // select the currency to convert from
  const onSelectFrom = (rate) => {
    setFrom(rate);
    // console.log("Conversion.js 17, from", rate);
  };

  // select the currency to convert to
  const onSelectTo = (rate) => {
    setTo(rate);
    // console.log("Conversion.js 23, to", rate);
  };

  // input the amount to convert
  const handleAmount = (amount) => {
    setAmount(amount);
    // console.log("Conversion.js 29, amount", amount);
  };

  // when the user presses the submit button, call the convert function to get the result
  const handleSubmit = async () => {
    //check if amount is a positive number
    if (positiveNumberChecker(amount)) {
      const result = await convert({ data: { from, to, amount } });
      setConvertedAmount(result);
    }
  };

  const handleOutsidePress = () => {
    if (openFrom) {
      setOpenFrom(false);
    }
    if (openTo) {
      setOpenTo(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
      <View style={styles.container}>
        <View
          style={[
            styles.dropdownContainer,
            Platform.OS === "ios" ? { zIndex: 2000 } : {},
          ]}
        >
          <CustomText style={styles.label}>From: </CustomText>
          <DropDownMenu
            onSelect={onSelectFrom}
            base={"CAD"}
            style={{ width: "100%" }}
            open={openFrom}
            setOpen={setOpenFrom}
            onOpen={() => setOpenTo(false)}
          />
        </View>
        <View
          style={[
            styles.dropdownContainer,
            Platform.OS === "ios" ? { zIndex: 1000 } : {},
          ]}
        >
          <CustomText style={{ marginRight: 29 }}>To: </CustomText>
          <DropDownMenu
            onSelect={onSelectTo}
            base={"USD"}
            style={{ width: "100%" }}
            open={openTo}
            setOpen={setOpenTo}
            onOpen={() => setOpenFrom(false)}
          />
        </View>
        <View style={styles.itemContainer}>
          <CustomText style={styles.label}>Amount: </CustomText>
          <Input onChangeText={handleAmount}></Input>
        </View>
        <View style={styles.itemContainer}>
          <RegularButton onPress={handleSubmit}>Submit</RegularButton>
        </View>
        {convertedAmount && (
          <View style={styles.itemContainer}>
            <Text>
              Result: {convertedAmount} {to}
            </Text>
          </View>
        )}
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
  dropdownContainer: {
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginVertical: 5,
  },
  itemContainer: {
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    marginVertical: 5,
  },
  label: {
    marginRight: 10,
  },
});
