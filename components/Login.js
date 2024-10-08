import React, { useState } from "react";
import { StyleSheet, View, Text, Alert, Pressable } from "react-native";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/firebaseSetup";
import RegularButton from "./RegularButton";
import TextInputBox from "./TextInputBox"; 
import { colors } from "../helpers/ConstantsHelper";

// This component is used to log in the user
export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // when user clicks on the login button, this function is called
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }

    // try to sign in the user with the provided email and password
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert("Login", `Welcome back, ${email}!`);
      // if successful, navigate to the profile screen
      navigation.navigate("ProfileScreen");
    } catch (error) {
      // if there is an error, display an error message
      console.error("Login error: ", error);
      let message = "An error occurred. Please try again.";
      switch (error.code) {
        case "auth/wrong-password":
          message = "Incorrect password. Please try again.";
          break;
        case "auth/user-not-found":
          message = "No user found with this email.";
          break;
        case "auth/invalid-email":
          message = "Invalid email format. Please check and try again.";
          break;
        case "auth/too-many-requests":
          message = "Too many unsuccessful login attempts. Please try again later.";
          break;
      }
      setErrorMessage(message);
    }
  };

  // when user clicks on the "Forgot your password?" text, this function is called
  const handleForgotPassword = () => {
    if (!email) {
      Alert.alert("Forgot Password", "Please enter your email to reset your password.");
      return;
    }

    // this function sends a password reset email to the user
    sendPasswordResetEmail(auth, email)
      .then(() => {
        Alert.alert("Password Reset", "Password reset email sent!");
      })
      .catch((error) => {
        console.error("Password reset error: ", error);
        let message = "An error occurred. Please try again.";
        switch (error.code) {
          case "auth/user-not-found":
            message = "No user found with this email.";
            break;
          case "auth/invalid-email":
            message = "Invalid email format. Please check and try again.";
            break;
          default:
            message = error.message;
        }
        setErrorMessage(message);
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
      <Pressable
        onPress={handleForgotPassword}
        style={({ pressed }) => [
          {
            opacity: pressed ? 0.5 : 1,
          },
        ]}
        android_ripple={{ color: "lightgray" }}
      >
        <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
      </Pressable>
      <Pressable
        onPress={() => navigation.navigate("SignUpScreen")}
        style={({ pressed }) => [
          {
            opacity: pressed ? 0.5 : 1,
          },
        ]}
        android_ripple={{ color: "lightgray" }} 
      >
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
    backgroundColor: colors.thirdTheme,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  errorText: {
    color: colors.red,
    marginBottom: 10,
    textAlign: "center",
  },
  forgotPasswordText: {
    color: colors.blue,
    textAlign: "center",
    marginTop: 20,
  },
  signUpText: {
    color: colors.blue,
    textAlign: "center",
    marginTop: 20,
  },
});
