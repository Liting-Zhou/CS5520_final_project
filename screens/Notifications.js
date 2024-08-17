import { StyleSheet, Text, View, FlatList, Alert } from "react-native";
import React, {
  useState,
  useLayoutEffect,
  useEffect,
  useCallback,
} from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
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

  console.log("Notifications.js 31, isActive: ", isActive);

  const verifyPermission = async () => {
    try {
      const response = await ExpoNotifications.getPermissionsAsync();
      // console.log("Notifications.js 36, response: ", response);
      if (response.granted) {
        return true;
      }
      const newResponse = await ExpoNotifications.requestPermissionsAsync();
      return newResponse.granted;
    } catch (err) {
      console.error("notification permission error: ", err);
    }
  };

  const scheduleNotification = async (notificationsItems) => {
    console.log("Notifications.js 48, scheduling notifications");
    try {
      const hasPermission = await verifyPermission();
      if (hasPermission) {
        for (const notification of notificationsItems) {
          // get the current exchange rate
          const exchangeRate = await getExchangeRate({
            from: notification.from,
            to: notification.to,
          });
          const exchangeRateNumber = parseFloat(exchangeRate);
          const thresholdNumber = parseFloat(notification.threshold);
          // if the exchange rate exceeds the threshold, schedule a notification
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
              trigger: {
                seconds: 60,
                repeats: true,
              },
            });
            console.log("Notifications.js 76, notifications scheduled");
          }
        }
      }
    } catch (err) {
      console.error("schedule notification error: ", err);
    }
  };

  const switchNotificationHandler = async () => {
    // if notifications are active, turn them off
    if (isActive) {
      setIsActive(false);
      // set notificationStatus to false in the profile
      await updateNotificationStatustoDB(
        userId,
        { notificationStatus: false },
        "users"
      );
      // cancel all scheduled notifications
      await ExpoNotifications.cancelAllScheduledNotificationsAsync();
      Alert.alert("", "You have turned off the notifications.");
    } else {
      // if notifications are inactive, turn them on
      setIsActive(true);
      // set notificationStatus to true in the profile
      await updateNotificationStatustoDB(
        userId,
        { notificationStatus: true },
        "users"
      );
      // schedule notifications
      await scheduleNotification(notifications);
    }
  };

  // check if there are any scheduled notifications
  const checkScheduledNotifications = async () => {
    const scheduledNotifications =
      await ExpoNotifications.getAllScheduledNotificationsAsync();
    return scheduledNotifications.length > 0;
  };

  // fetch notifications from the database
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

  // configure the component
  const configuration = async () => {
    const fetchedNotifications = await fetchNotifications();
    try {
      if (userId) {
        // get the notification status from profile
        const results = await readProfileFromDB(userId, "users");
        const notificationStatusInDB = results.notificationStatus;
        console.log(
          "Notifications.js 142, notificationStatus in DB: ",
          notificationStatusInDB
        );
        if (notificationStatusInDB) {
          setIsActive(notificationStatusInDB);
        }

        // check if there are any scheduled notifications
        const hasScheduledNotifications = await checkScheduledNotifications();
        console.log(
          "Notifications.js 152, hasScheduledNotifications: ",
          hasScheduledNotifications
        );

        // if notification status is active but there are no scheduled notifications, schedule them
        if (notificationStatusInDB && !hasScheduledNotifications) {
          await scheduleNotification(fetchedNotifications);
        }
        // if notification status is inactive but there are scheduled notifications, cancel them
        if (!notificationStatusInDB && hasScheduledNotifications) {
          await ExpoNotifications.cancelAllScheduledNotificationsAsync();
        }
      }
    } catch (error) {
      console.error("Error configuring component: ", error);
    }
  };

  // fetch notifications from DB when the component mounts
  useEffect(() => {
    configuration();
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
