import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ProfilePressable from "../components/ProfilePressable";
import defaultUserPhoto from "../assets/default_user_photo.jpg";
import { colors, textSizes } from "../helpers/ConstantsHelper";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebaseSetup";

export default function Profile() {
  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState("User");
  const [email, setEmail] = useState("username@example.com");
  const navigation = useNavigation();
  // temporary use user id and collection name for testing
  const userId = "User1";
  const collectionName = "users";

  // Fetch user profile from Firestore
  useEffect(() => {
    const userDocRef = doc(db, collectionName, userId);

    const unsubscribe = onSnapshot(
      userDocRef,
      (doc) => {
        if (doc.exists()) {
          const userData = doc.data();
          setName(userData.name || "User");
          setEmail(userData.email || "username@example.com");
          setPhoto(userData.photo || null);
        } else {
          console.log("No such document!");
        }
      },
      (error) => {
        console.error("Error fetching profile: ", error);
      }
    );

    return () => unsubscribe();
  }, [userId, collectionName]);

  return (
    <View style={styles.container}>
      <ProfilePressable
        onPress={() => navigation.navigate("ProfileDetail", { userId })}
      >
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
        <View style={styles.transactionContainer}>
          <MaterialIcons
            name="currency-exchange"
            size={20}
            color={colors.buttonBackground}
          />
          <Text style={styles.historyText}>Exchange Transaction History</Text>
        </View>
      </ProfilePressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: colors.white,
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
  transactionContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  historyText: {
    fontSize: textSizes.medium,
    color: colors.primary,
    marginLeft: 10,
  },
});
