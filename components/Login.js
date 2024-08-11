import React, { useState } from "react";
import { StyleSheet, View, Text, Alert, Pressable } from "react-native";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/firebaseSetup";
import RegularButton from "./RegularButton";
import TextInputBox from "./TextInputBox"; 

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert("Login", `Welcome back, ${email}!`);
      navigation.navigate("ProfileScreen");
    } catch (error) {
      console.error("Login error: ", error);
      setErrorMessage(error.message);
    }
  };

  const handleForgotPassword = () => {
    if (!email) {
      Alert.alert("Forgot Password", "Please enter your email to reset your password.");
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        Alert.alert("Password Reset", "Password reset email sent!");
      })
      .catch((error) => {
        console.error("Password reset error: ", error);
        setErrorMessage(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInputBox
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInputBox
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
        secureTextEntry={true}
      />
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
      <RegularButton onPress={handleLogin}>
        Login
      </RegularButton>
      <Pressable onPress={handleForgotPassword}>
        <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate("SignUpScreen")}>
        <Text style={styles.signUpText}>Don't have an account? Sign up</Text>
      </Pressable>
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
  errorText: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
  forgotPasswordText: {
    color: "#0066cc",
    textAlign: "center",
    marginTop: 20,
  },
  signUpText: {
    color: "#0066cc",
    textAlign: "center",
    marginTop: 20,
  },
});
