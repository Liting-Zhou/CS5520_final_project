import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const Signup = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

  const handleSignup = async () => {
    if (!email.length) {
      Alert.alert('Email is required');
      return;
    }
    if (!password.length) {
      Alert.alert('Password is required');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Passwords do not match');
      return;
    }

    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      navigation.navigate('ProfileScreen');
    } catch (e) {
      console.error(e);
      if (e.code === 'auth/invalid-email') {
        setEmailError('Invalid email address');
      } else if (e.code === 'auth/email-already-in-use') {
        setEmailError('Email is already in use');
      } else {
        setEmailError(e.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Email Address</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {emailError ? <Text style={styles.error}>{emailError}</Text> : null}
      <Text style={styles.title}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      {passwordError ? <Text style={styles.error}>{passwordError}</Text> : null}
      <Text style={styles.title}>Confirm Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry={true}
      />
      <Button title="Signup" onPress={handleSignup} />
      <Button title="Already Registered? Login" onPress={() => navigation.replace('LogInScreen')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    textAlign: 'left',
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
  error: {
    color: 'red',
    marginBottom: 12,
  },
});

export default Signup;