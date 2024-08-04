import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons';
import RegularButton from '../components/RegularButton';
import { colors, textSizes } from '../helpers/Constants';

export default function ProfileDetail() {
  const navigation = useNavigation();
  const route = useRoute();
  const { name, email, photo, updateProfile } = route.params;

  const [newName, setNewName] = useState(name);
  const [newEmail, setNewEmail] = useState(email);
  const [newPhoto, setNewPhoto] = useState(photo);

  // let the user pick an image from the gallery
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

  // save the new profile information
  const handleSave = () => {
    updateProfile(newName, newEmail, newPhoto);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={pickImage} style={({ pressed }) => [styles.photoContainer, pressed && styles.pressed]}>
        <Image source={newPhoto ? { uri: newPhoto } : require('../assets/default_user_photo.jpg')} style={styles.photo} />
        <View style={styles.cameraIconContainer}>
          <FontAwesome name="camera" size={textSizes.small} color={colors.white} style={styles.cameraIcon} />
        </View>
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
      <View style={styles.buttonContainer}>
      <RegularButton onPress={handleSave}>Save</RegularButton>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.white,
    padding: 20,
  },
  title: {
    fontSize: textSizes.large,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 5,
    marginBottom: 20,
  },
  photoContainer: {
    position: 'relative',
    marginBottom: 20,
    alignSelf: 'center',
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  cameraIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.transparentGray,
    padding: 5,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.white,
  },
  cameraIcon: {
    color: colors.white,
  },
  pressed: {
    opacity: 0.8,
  },
  buttonContainer: {
    width: '40%',
    alignSelf: 'center',
  },
  labelContainer: {
    width: '100%',
    marginBottom: 5,
  },
  label: {
    fontSize: textSizes.medium,
    color: colors.gray,
  },
});

