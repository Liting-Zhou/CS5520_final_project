import React, { useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { colors, textSizes } from "../helpers/ConstantsHelper";
import { LinearGradient } from "expo-linear-gradient";

export default function Welcome({ navigation }) {
  // show the welcome screen for 2 seconds before navigating to the Rates screen
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("MainApp");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <LinearGradient
      colors={[colors.firstTheme, colors.secondTheme]}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to</Text>
        <Text style={styles.title}>Currency Manager!</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
  },
  title: {
    fontSize: textSizes.large,
    fontWeight: "bold",
    color: colors.thirdTheme,
    marginBottom: 20,
  },
});
