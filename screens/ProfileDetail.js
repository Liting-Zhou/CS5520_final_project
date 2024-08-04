import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import RegularButton from '../components/RegularButton'; 

export default function ProfileDetail() {
  const navigation = useNavigation();
  const route = useRoute();
  const { name, email, photo, updateProfile } = route.params;

  const [newName, setNewName] = useState(name);
  const [newEmail, setNewEmail] = useState(email);
  const [newPhoto, setNewPhoto] = useState(photo);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setNewPhoto(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    updateProfile(newName, newEmail, newPhoto);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={pickImage}>
        <Image source={newPhoto ? { uri: newPhoto } : require('../assets/default_user_photo.jpg')} style={styles.photo} />
      </Pressable>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Username:</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={newName}
        onChangeText={setNewName}
      />
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Email:</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={newEmail}
        onChangeText={setNewEmail}
        keyboardType="email-address"
      />
      <RegularButton onPress={handleSave}>Save</RegularButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 20,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    alignSelf: 'center',
  },
  labelContainer: {
    width: '100%',
    marginBottom: 5,
  },
  label: {
    fontSize: 16,
    color: 'gray',
  },
});
