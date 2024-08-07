import { Alert } from "react-native";

// check if the number is a non-negative number
export const positiveNumberChecker = (number) => {
  if (isNaN(number)) {
    Alert.alert("", "Please enter a valid amount.");
    return false;
  }
  if (number < 0) {
    Alert.alert("", "Please enter a positive number.");
    return false;
  }
  return true;
};
