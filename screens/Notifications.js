import { StyleSheet, Text, View, FlatList, Alert } from "react-native";
import React, {
  useState,
  useLayoutEffect,
  useEffect,
  useCallback,
} from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ExpoNotifications from "expo-notifications";

import NotificationItem from "../components/NotificationItem";
import AddButton from "../components/AddButton";
import RegularButton from "../components/RegularButton";

import { getAuth } from "firebase/auth";
import {
  readNotificationsFromDB,
  readProfileFromDB,
  updateNotificationStatustoDB,
} from "../firebase/firebaseHelper";
import { getExchangeRate } from "../helpers/RatesHelper";
import { textSizes, colors } from "../helpers/ConstantsHelper";

export default function Notifications() {
  const navigation = useNavigation();
  const [notifications, setNotifications] = useState([]);
  const [isActive, setIsActive] = useState(false); // denotes whether the notifications are active
  const auth = getAuth();
  const userId = auth.currentUser?.uid;

  const clearIntervals = async () => {
    const storedIds = await AsyncStorage.getItem("intervalIds");
    if (storedIds) {
      const ids = JSON.parse(storedIds);
      ids.forEach((id) => clearInterval(id));
      console.log("Notifications.js 37, intervals cleared", ids);
      await AsyncStorage.removeItem("intervalIds");
    }
  };

  // verify permission for notifications
  const verifyPermission = async () => {
    try {
      const response = await ExpoNotifications.getPermissionsAsync();
      if (response.granted) {
        return true;
      }
      const newResponse = await ExpoNotifications.requestPermissionsAsync();
      return newResponse.granted;
    } catch (err) {
      console.error("notification permission error: ", err);
    }
  };

  // schedule notifications
  const scheduleNotifications = async (notificationsItems) => {
    console.log("Notifications.js 58, scheduling notifications");
    try {
      const hasPermission = await verifyPermission();
      if (hasPermission) {
        //first clear all intervals
        await clearIntervals();
        //then schedule new intervals
        const ids = notificationsItems.map((notification) => {
          const id = setInterval(() => checkAndNotify(notification), 30000);
          return id;
        });
        console.log("Notifications.js 69, ids: ", ids);
        await AsyncStorage.setItem("intervalIds", JSON.stringify(ids));
      }
    } catch (err) {
      console.error("schedule notification error: ", err);
    }
  };

  // helper function to schedule notifications
  const checkAndNotify = async (notification) => {
    try {
      const exchangeRate = await getExchangeRate({
        from: notification.from,
        to: notification.to,
      });
      const exchangeRateNumber = parseFloat(exchangeRate);
      const thresholdNumber = parseFloat(notification.threshold);

      if (exchangeRateNumber > thresholdNumber) {
        await ExpoNotifications.scheduleNotificationAsync({
          content: {
            title: "Exchange Rate Alert",
            body: `${notification.from} based on ${
              notification.to
            } is now ${exchangeRateNumber.toFixed(
              4
            )}, exceeding ${thresholdNumber.toFixed(4)}.`,
          },
          trigger: null,
        });
        console.log("Notifications.js 99, notification scheduled");
      }
    } catch (error) {
      console.error("Error checking and notify: ", error);
    }
  };

  const switchNotificationHandler = async () => {
    console.log("Notifications.js 107, isActive: ", isActive);
    if (isActive) {
      setIsActive(false);
      await updateNotificationStatustoDB(
        userId,
        { notificationStatus: false },
        "users"
      );
      await clearIntervals();
      console.log("Notifications.js 115, intervals cleared when switching off");
      Alert.alert("", "You have turned off the notifications.");
    } else {
      setIsActive(true);
      await updateNotificationStatustoDB(
        userId,
        { notificationStatus: true },
        "users"
      );
      await scheduleNotifications(notifications);
    }
  };

  const fetchNotifications = async () => {
    try {
      if (userId) {
        const fetchedNotifications = await readNotificationsFromDB(userId);
        setNotifications(fetchedNotifications);
        return fetchedNotifications;
      }
    } catch (error) {
      console.error("Error fetching notification items: ", error);
      return [];
    }
  };

  const configuration = async () => {
    const fetchedNotifications = await fetchNotifications();
    try {
      if (userId) {
        const results = await readProfileFromDB(userId, "users");
        const notificationStatusInDB = results.notificationStatus;
        console.log(
          "Notifications.js 148, notificationStatus in DB: ",
          notificationStatusInDB
        );
        if (notificationStatusInDB) {
          setIsActive(() => true);
          const storedIds = await AsyncStorage.getItem("intervalIds");
          console.log("Notifications.js 155, storedIds: ", storedIds);
          if (storedIds) {
            clearIntervals();
          }
          await scheduleNotifications(fetchedNotifications);
        }
      }
    } catch (error) {
      console.error("Error configuring component: ", error);
    }
  };

  // configure the component
  useEffect(() => {
    configuration();
  }, []);

  // when notifications change, update them
  useFocusEffect(
    useCallback(() => {
      fetchNotifications();
    }, [userId])
  );

  // when notifications change, reschedule them
  useEffect(() => {
    if (isActive) {
      scheduleNotifications(notifications);
    }
  }, [notifications]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <AddButton onPress={() => navigation.navigate("AddNotification")} />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Notify me when:</Text>
      <FlatList
        data={notifications}
        renderItem={({ item }) => (
          <NotificationItem item={item} status={isActive} />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
      <RegularButton
        onPress={switchNotificationHandler}
        buttonStyle={styles.buttonStyle}
      >
        {isActive ? "Turn off Notifications" : "Turn on Notifications"}
      </RegularButton>
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
  buttonStyle: {
    marginBottom: 50,
  },
});
