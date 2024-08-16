import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Image,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import RegularButton from "../components/RegularButton";
import { colors, textSizes } from "../helpers/ConstantsHelper";
import { updateProfileInDB, readProfileFromDB } from "../firebase/firebaseHelper";
import { getAuth } from "firebase/auth";
import { ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase/firebaseSetup"; 
import ImageManager from "../components/ImageManager";

export default function ProfileDetail() {
  const navigation = useNavigation();
  const auth = getAuth();
  const userId = auth.currentUser?.uid;

  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhoto, setNewPhoto] = useState(null);

  // Fetch the user profile from Firestore
  useEffect(() => {
    const fetchProfile = async () => {
      if (userId) {
        const userProfile = await readProfileFromDB(userId, "users");
        if (userProfile) {
          setNewName(userProfile.name);
          setNewEmail(userProfile.email);
          setNewPhoto(userProfile.photo);
        }
      }
    };

    fetchProfile();
  }, [userId]);

  // Function to retrieve and upload the image to Firebase Storage
  async function retrieveAndUploadImage(uri) {
    try {
      const response = await fetch(uri);
      if (!response.ok) {
        throw new Error("The request was not successful");
      }
      const blob = await response.blob();
      const imageName = uri.substring(uri.lastIndexOf('/') + 1);
      const imageRef = ref(storage, `profileImages/${imageName}`);
      const uploadResult = await uploadBytesResumable(imageRef, blob);
      return uploadResult.metadata.fullPath;
    } catch (e) {
      console.error('Error retrieving image:', e);
      throw e;
    }
  }

  // Save the new profile information using the updateProfileInDB function
  const handleSave = async () => {
    if (!newName || !newEmail) {
      Alert.alert("Error", "Name and email are required.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(newEmail)) {
      Alert.alert("Error", "Please enter a valid email address.");
      return;
    }

    let uploadedPhotoPath = newPhoto;

    // Upload the image if a new photo is selected
    if (newPhoto) {
      try {
        uploadedPhotoPath = await retrieveAndUploadImage(newPhoto);
      } catch (error) {
        Alert.alert("Error", "There was a problem uploading your profile photo.");
        return;
      }
    }

    try {
      await updateProfileInDB(
        userId,
        { name: newName, email: newEmail, photo: uploadedPhotoPath },
        "users"
      );
      navigation.goBack();
    } catch (error) {
      console.error("Error saving profile: ", error);
      Alert.alert("Error", "There was a problem saving your profile.");
    }
  };

  return (
    <View style={styles.container}>
      <ImageManager imageUriHandler={setNewPhoto}>
        <Pressable
          style={({ pressed }) => [
            styles.photoContainer,
            pressed && styles.pressed,
          ]}
        >
          <Image
            source={
              newPhoto
                ? { uri: newPhoto }
                : require("../assets/default_user_photo.jpg")
            }
            style={styles.photo}
          />
          <View style={styles.cameraIconContainer}>
            <FontAwesome
              name="camera"
              size={textSizes.small}
              color={colors.white}
              style={styles.cameraIcon}
            />
          </View>
        </Pressable>
      </ImageManager>
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
    justifyContent: "center",
    backgroundColor: colors.thirdTheme,
    padding: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 5,
    marginBottom: 20,
  },
  photoContainer: {
    position: "relative",
    marginBottom: 20,
    alignSelf: "center",
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  cameraIconContainer: {
    position: "absolute",
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
    width: "40%",
    alignSelf: "center",
  },
  labelContainer: {
    width: "100%",
    marginBottom: 5,
  },
  label: {
    fontSize: textSizes.medium,
    color: colors.gray,
  },
});
