import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../helpers/ConstantsHelper";

export default function LocationFinder() {
  return (
    <View style={styles.container}>
      <Text>locationFinder screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.thirdTheme,
  },
});
