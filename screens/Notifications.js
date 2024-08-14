import { StyleSheet, Text, View, FlatList, Modal, Button } from "react-native";
import React, {
  useState,
  useLayoutEffect,
  useEffect,
  useCallback,
} from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
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

  // fetch notifications from DB when the component mounts
  useEffect(() => {
    fetchNotifications();
  }, []);

  // fetch notifications when the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      fetchNotifications();
    }, [userId])
  );

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
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 20,
  },
  list: {
    paddingBottom: 20,
  },
});
