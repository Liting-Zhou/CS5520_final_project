import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import RegularButton from "./RegularButton"; 

const Signup = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');

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
    setEmailError('');
    setPasswordError('');

    if (!email.length) {
      setEmailError('Email is required');
      return;
    }
    if (!password.length) {
      setPasswordError('Password is required');
      return;
    }
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    try {
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, email, password);
      navigation.navigate('ProfileScreen');
    } catch (e) {
      console.error(e);
      if (e.code === 'auth/invalid-email') {
        setEmailError('Invalid email address');
      } else if (e.code === 'auth/email-already-in-use') {
        setEmailError('Email is already in use');
      } else if (e.code === 'auth/weak-password') {
        setPasswordError('Password should be at least 6 characters');
      } else {
        setPasswordError(e.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
      {passwordStrength ? <Text style={styles.passwordStrength}>{passwordStrength}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry={true}
      />

      <RegularButton onPress={handleSignup}>
        Sign Up
      </RegularButton>

      <TouchableOpacity onPress={() => navigation.replace('LogInScreen')}>
        <Text style={styles.signInText}>Already Registered? Log in</Text>
      </TouchableOpacity>
    </View>
  );
};

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
  errorText: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
  passwordStrength: {
    fontSize: 14,
    marginBottom: 10,
    color: "#666",
    textAlign: "center",
  },
  signInText: {
    color: "#0066cc",
    textAlign: "center",
    marginTop: 20,
  },
});

export default Signup;