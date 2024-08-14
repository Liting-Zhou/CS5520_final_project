import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import React, { useState, useLayoutEffect } from "react";
import DropDownMenu from "../components/DropDownMenu";
import Input from "../components/Input";
import RegularButton from "../components/RegularButton";
import CustomText from "../components/CustomText";
import { colors, textSizes } from "../helpers/ConstantsHelper";
import { positiveNumberChecker } from "../helpers/Checker";
import { getAuth } from "firebase/auth";
import { writeNotificationToDB } from "../firebase/firebaseHelper";
import { useNavigation, useRoute } from "@react-navigation/native";
import TrashBinButton from "../components/TrashBinButton";

export default function AddNotification() {
  const navigation = useNavigation();
  const [from, setFrom] = useState("CAD");
  const [to, setTo] = useState("USD");
  const [openFrom, setOpenFrom] = useState(false);
  const [openTo, setOpenTo] = useState(false);
  const [threshold, setThreshold] = useState("");
  const auth = getAuth();
  const userId = auth.currentUser?.uid;
  const route = useRoute();

  handleDelete = async (id) => {};

  useLayoutEffect(() => {
    // if route.params exists, set the title to "Edit" and add a delete button
    if (route.params) {
      // console.log("AddNotification.js 36, route.params: ", route.params);
      navigation.setOptions({
        title: "Edit",
        headerRight: () => <TrashBinButton onPress={handleDelete} />,
      });
      setFrom(route.params.item.from);
      setTo(route.params.item.to);
      setThreshold(route.params.item.threshold.toString());
    }
  }, []);

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

  const handleSave = async () => {
    //validate the input
    if (from === to) {
      Alert.alert("Error", "You should not choose the same currency.");
      return;
    }
    if (positiveNumberChecker(threshold)) {
      //save the notification to DB
      try {
        const notification = { from: from, to: to, threshold: threshold };
        await writeNotificationToDB(userId, notification);
        Alert.alert(
          "",
          "Your notification setting has been saved successfully!"
        );
        navigation.goBack();
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
        <View style={{ alignItems: "flex-start", width: "85%" }}>
          <CustomText
            style={{
              fontSize: textSizes.large,
              fontWeight: "bold",
              marginBottom: 20,
            }}
          >
            Notify Me:
          </CustomText>
        </View>

        <View style={[styles.dropdownContainer, { zIndex: 2000 }]}>
          <CustomText style={styles.label}>When: </CustomText>
          <DropDownMenu
            onSelect={onSelectFrom}
            base={from}
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
            base={to}
            style={{ width: "100%" }}
            open={openTo}
            setOpen={setOpenTo}
            onOpen={() => setOpenFrom(false)}
          />
        </View>
        <View style={styles.itemContainer}>
          <CustomText style={{ marginRight: 10 }}>Exceeds: </CustomText>
          <Input onChangeText={handleInput} defaultValue={threshold}></Input>
        </View>
        <View style={styles.itemContainer}>
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
