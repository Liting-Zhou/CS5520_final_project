import React, { useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { colors, textSizes } from "../helpers/ConstantsHelper";

export default function Welcome({ navigation }) {
  // show the welcome screen for 2 seconds before navigating to the Rates screen
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("MainApp");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to</Text>
      <Text style={styles.title}>Currency Manager!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.firstTheme,
  },
  title: {
    fontSize: textSizes.large,
    fontWeight: "bold",
    color: colors.thirdTheme,
    marginBottom: 20,
  },
});
