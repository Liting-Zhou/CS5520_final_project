import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Alert } from "react-native";
import RegularButton from "./RegularButton"; // Adjust the import path as necessary

export default function Login({ navigation, setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Placeholder for login logic
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }

    // Assuming login is successful
    Alert.alert("Login", `Welcome back, ${email}!`);
    setIsLoggedIn(true); // Update isLoggedIn state to true

    // Navigate to ProfileScreen
    navigation.navigate("ProfileScreen");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <RegularButton onPress={handleLogin}>
        Login
      </RegularButton>
      <RegularButton onPress={() => navigation.navigate("SignUpScreen")}>
        Don't have an account? Sign up
      </RegularButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 20,
  },
});
