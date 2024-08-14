import { StyleSheet, Text, View, FlatList, Modal, Button } from "react-native";
import React, { useState, useLayoutEffect, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { textSizes, colors } from "../helpers/ConstantsHelper";
import NotificationItem from "../components/NotificationItem";
import AddButton from "../components/AddButton";
import { getAuth } from "firebase/auth";
import { readNotificationsFromDB } from "../firebase/firebaseHelper";

export default function Notifications() {
  const navigation = useNavigation();
  const [notifications, setNotifications] = useState([]);
  const auth = getAuth();
  const userId = auth.currentUser?.uid;

  // fetch notifications from DB when the component mounts
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        if (userId) {
          const fetchedNotifications = await readNotificationsFromDB(userId);
          setNotifications(fetchedNotifications);
        }
      } catch (error) {
        console.error("Error fetching notifications: ", error);
      }
    };
    fetchNotifications();
  }, []);

  // headerRight button to add a notification
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <AddButton onPress={() => navigation.navigate("AddNotification")} />
      ),
    });
  }, [navigation]);

  const addButtonHandler = () => {
    // setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Notify me when:</Text>
      <FlatList
        data={notifications}
        renderItem={({ item }) => <NotificationItem item={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.thirdTheme,
  },
  text: {
    fontSize: textSizes.medium,
    marginBottom: 20,
  },
  list: {
    paddingBottom: 20,
  },
  //   modalView: {
  //     margin: 20,
  //     backgroundColor: colors.white,
  //     borderRadius: 20,
  //     padding: 35,
  //     alignItems: "center",
  //     shadowColor: "#000",
  //     shadowOffset: {
  //       width: 0,
  //       height: 2,
  //     },
  //     shadowOpacity: 0.25,
  //     shadowRadius: 4,
  //     elevation: 5,
  //   },
  //   modalOverlay: {
  //     flex: 1,
  //     justifyContent: "center",
  //     alignItems: "center",
  //     backgroundColor: colors.modalOverlay,
  //   },

  //   modalContent: {
  //     width: "80%",
  //     backgroundColor: colors.thirdTheme,
  //     padding: 20,
  //     borderRadius: 10,
  //     // justifyContent: "center",
  //     alignItems: "center",
  //   },
  //   modalTitle: {
  //     fontSize: textSizes.medium,
  //     fontWeight: "bold",
  //     marginBottom: 20,
  //   },
});
