import React, { useState, useCallback } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import ProfilePressable from "../components/ProfilePressable";
import defaultUserPhoto from "../assets/default_user_photo.jpg";
import { colors, textSizes } from "../helpers/ConstantsHelper";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { getAuth } from "firebase/auth";
import { readProfileFromDB } from "../firebase/firebaseHelper";

export default function Profile() {
  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigation = useNavigation();

  const auth = getAuth();
  const userId = auth.currentUser?.uid;

  // Fetch user profile from Firestore
  const fetchProfile = useCallback(async () => {
    if (userId) {
      const userProfile = await readProfileFromDB(userId, "users");
      if (userProfile) {
        setName(userProfile.name);
        setEmail(userProfile.email);
        setPhoto(userProfile.photo);
      }
    }
  }, [userId]);

  useFocusEffect(
    useCallback(() => {
      fetchProfile();
    }, [fetchProfile])
  );

  if (!userId) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>User not logged in</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ProfilePressable onPress={() => navigation.navigate("ProfileDetail")}>
        <Image
          source={photo ? { uri: photo } : defaultUserPhoto}
          style={styles.photo}
        />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.email}>{email}</Text>
        </View>
      </ProfilePressable>
      <ProfilePressable
        onPress={() => navigation.navigate("TransactionHistory")}
      >
        <View style={styles.itemContainer}>
          <MaterialIcons
            name="currency-exchange"
            size={24}
            color={colors.buttonBackground}
          />
          <Text style={styles.itemText}>Exchange Transaction History</Text>
        </View>
      </ProfilePressable>
      <ProfilePressable onPress={() => navigation.navigate("Notifications")}>
        <View style={styles.itemContainer}>
          <AntDesign
            name="notification"
            size={24}
            color={colors.buttonBackground}
          />
          <Text style={styles.itemText}>Notification Settings</Text>
        </View>
      </ProfilePressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.thirdTheme,
  },
  photo: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 20,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: textSizes.large,
    fontWeight: "bold",
    marginBottom: 5,
  },
  email: {
    fontSize: textSizes.medium,
    color: colors.gray,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemText: {
    fontSize: textSizes.medium,
    marginLeft: 10,
  },
  errorText: {
    fontSize: textSizes.large,
    color: colors.red,
    textAlign: "center",
  },
});
