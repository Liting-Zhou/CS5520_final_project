import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import React, { useState } from "react";
import DropDownMenu from "../components/DropDownMenu";
import Input from "../components/Input";
import RegularButton from "../components/RegularButton";
import CustomText from "../components/CustomText";
import { colors, textSizes } from "../helpers/ConstantsHelper";
import { positiveNumberChecker } from "../helpers/Checker";
import { getAuth } from "firebase/auth";
import { writeNotificationToDB } from "../firebase/firebaseHelper";

export default function AddNotification() {
  const [from, setFrom] = useState("CAD");
  const [to, setTo] = useState("USD");
  const [openFrom, setOpenFrom] = useState(false);
  const [openTo, setOpenTo] = useState(false);
  const [threshold, setThreshold] = useState("");
  const auth = getAuth();
  const userId = auth.currentUser?.uid;

  // select the currency from
  const onSelectFrom = (currency) => {
    setFrom(currency);
  };

  // select the currency to
  const onSelectTo = (currency) => {
    setTo(currency);
  };

  const handleInput = (input) => {
    setThreshold(input);
  };

  const handleSubmit = async () => {
    //validate the input
    if (positiveNumberChecker(threshold)) {
      //save the notification to DB
      try {
        const notification = { from: from, to: to, threshold: threshold };
        await writeNotificationToDB(userId, notification);
        Alert.alert(
          "",
          "Your notification setting has been saved successfully!"
        );
      } catch (error) {
        Alert.alert("", "Failed to save, please try again later.");
      }
    }
  };

  const handleOutsidePress = () => {
    // console.log("AddNotification.js 11, handleOutsidePress");
  };

  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
      <View style={styles.container}>
        <CustomText
          style={{
            fontSize: textSizes.large,
            fontWeight: "bold",
            marginBottom: 10,
          }}
        >
          Notify Me
        </CustomText>
        <View style={[styles.dropdownContainer, { zIndex: 2000 }]}>
          <CustomText style={styles.label}>When: </CustomText>
          <DropDownMenu
            onSelect={onSelectFrom}
            base={"CAD"}
            style={{ width: "100%" }}
            open={openFrom}
            setOpen={setOpenFrom}
            onOpen={() => setOpenTo(false)}
          />
        </View>
        <View style={[styles.dropdownContainer, { zIndex: 1000 }]}>
          <CustomText>Based on: </CustomText>
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
          <CustomText style={{ marginRight: 10 }}>Exceeds: </CustomText>
          <Input onChangeText={handleInput}></Input>
        </View>
        <View style={styles.itemContainer}>
          <RegularButton onPress={handleSubmit}>Submit</RegularButton>
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
    marginRight: 25,
  },
});
