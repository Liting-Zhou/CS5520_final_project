import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { writeProfileToDB } from '../firebase/firebaseHelper';
import RegularButton from "./RegularButton"; 
import TextInputBox from "./TextInputBox"; 
import { colors } from "../helpers/ConstantsHelper";

const Signup = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // New state for error messages

  useEffect(() => {
    if (password.length >= 6 && password.length < 10) {
      setPasswordStrength('Password strength: Weak');
    } else if (password.length >= 10 && !/[A-Z]/.test(password)) {
      setPasswordStrength('Password strength: Medium');
    } else if (password.length >= 10 && /[A-Z]/.test(password)) {
      setPasswordStrength('Password strength: Strong');
    } else {
      setPasswordStrength('');
    }
  }, [password]);

  const handleSignup = async () => {
    setErrorMessage(''); 
    if (!email.length) {
      setErrorMessage('Email is required');
      return;
    }
    if (!password.length) {
      setErrorMessage('Password is required');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userId = user.uid;

      await writeProfileToDB(
        {
          userId,
          name: "Username", 
          email,
          photo: null 
        },
        "users" 
      );

      navigation.navigate('ProfileScreen');
    } catch (e) {
      let message = 'An error occurred. Please try again.';
      switch (e.code) {
        case 'auth/invalid-email':
          message = 'Invalid email address';
          break;
        case 'auth/email-already-in-use':
          message = 'Email is already in use';
          break;
        case 'auth/weak-password':
          message = 'Password should be at least 6 characters';
          break;
        default:
          message = e.message;
      }
      setErrorMessage(message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

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
      {passwordStrength ? <Text style={styles.passwordStrength}>{passwordStrength}</Text> : null}

      <TextInputBox
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="Confirm your password"
        secureTextEntry={true}
      />

      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      <RegularButton onPress={handleSignup}>
        Sign Up
      </RegularButton>

      <Pressable onPress={() => navigation.replace('LogInScreen')}>
        <Text style={styles.signInText}>Already Registered? Log in</Text>
      </Pressable>
    </View>
  );
};

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
  passwordStrength: {
    fontSize: 14,
    marginTop: 10,
    color: colors.gray,
    textAlign: "center",
  },
  errorText: {
    marginTop: 10,
    color: colors.red,
    marginBottom: 10,
    textAlign: "center",
  },
  signInText: {
    color: colors.blue,
    textAlign: "center",
    marginTop: 20,
  },
});

export default Signup;
