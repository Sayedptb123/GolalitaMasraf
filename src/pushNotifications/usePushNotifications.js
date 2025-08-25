import { useEffect } from "react";
import messaging from "@react-native-firebase/messaging";
import PushNotification from "react-native-push-notification";
import { PermissionsAndroid, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const usePushNotifications = () => {
  const requestPermissions = async () => {
    try {
      if (Platform.OS === "android") {
        PushNotification.checkPermissions(async (res) => {
          if (!res?.alert) {
            const POST_NOTIFICATION_CONSTANT =
              PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS;
            if (!POST_NOTIFICATION_CONSTANT) {
              return;
            }

            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
            );

            console.log(granted, "granted");

            if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
              console.log("User has notification permissions enabled.");
              return;
            }
          }
        });
      }

      if (Platform.OS === "ios") {
        await messaging().registerDeviceForRemoteMessages();
        const authorizationStatus = await messaging().requestPermission();
        if (
          authorizationStatus !== messaging.AuthorizationStatus.AUTHORIZED &&
          authorizationStatus !== messaging.AuthorizationStatus.PROVISIONAL
        ) {
          console.log("User has not notification permissions enabled.");

          return;
        }
        const fcmToken = await messaging().getToken();

        if (!fcmToken) {
          console.log("Can not get ios FCM token");
          return;
        }

        console.log(fcmToken, "fcmToken");

        await AsyncStorage.setItem("deviceToken", fcmToken);
      }
    } catch (err) {
      console.log(err, "err request permissiob");
    }
  };

  useEffect(() => {
    requestPermissions();
  }, []);
};

export default usePushNotifications;
