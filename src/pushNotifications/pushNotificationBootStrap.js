import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification, { Importance } from "react-native-push-notification";
import { NOTIFICATION_DEFAULT_CHANNEL_ID } from "./config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import { handleNotificationClick } from "./notificationClickHandler";
import messaging from "@react-native-firebase/messaging";
import store from "../redux/store";
import { setClickedNotificationData } from "../redux/notifications/notifications-actions";

PushNotification.configure({
  onRegister: async function (deviceToken) {
    if (Platform.OS === "android") {
      console.log(deviceToken.token, "deviceToken.token");
      AsyncStorage.setItem("deviceToken", deviceToken.token);
    }

    PushNotification.createChannel(
      {
        channelId: NOTIFICATION_DEFAULT_CHANNEL_ID, // (required)
        channelName: "My channel", // (required)
        playSound: true, // (optional) default: true
        soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
        importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
      },
      (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
    );
  },
  onNotification: (notification) => {
    const isIOS = Platform.OS === "ios";
    const userInteracton = notification.userInteraction;
    const foreground = notification.foreground;

    // show ios notification when app is opened
    const merchant_id = notification?.data?.merchant_id;
    const product_id = notification?.data?.product_id;

    if (
      (!merchant_id || merchant_id === "false") &&
      (!product_id || product_id === "false")
    ) {
      // (required) Called when a remote is received or opened, or local notification is opened
      notification.finish(PushNotificationIOS.FetchResult.NoData);
      return;
    }

    if (
      isIOS &&
      !userInteracton &&
      foreground &&
      notification?.data?.sendedFromApp !== "true"
    ) {
      PushNotificationIOS.addNotificationRequest({
        id: NOTIFICATION_DEFAULT_CHANNEL_ID,
        title: notification.data?.title || "",
        body: notification.data?.body || "",

        userInfo: {
          title: notification.data?.title || "",
          body: notification.data?.body || "",
          product_id: notification.data?.product_id || "",
          merchant_id: notification.data?.merchant_id || "",
          sendedFromApp: "true",
        },
      });

      return;
    }

    // save notification data to store to handle it on main screen after Login screen (ios)
    if (isIOS && userInteracton && !foreground) {
      console.log("here1");
      store.dispatch(setClickedNotificationData(notification));
      notification.finish(PushNotificationIOS.FetchResult.NoData);
      return;
    }

    // handle notification click if app is opened (ios and android)
    if (userInteracton && foreground) {
      console.log("here 2");
      handleNotificationClick(notification);
      notification.finish(PushNotificationIOS.FetchResult.NoData);
      return;
    }
  },
  onRegistrationError: function (err) {
    console.error(err.message, err);
  },
  requestPermissions: true,
});

// save notification data to store to handle it on main screen after Login screen (android)
const setBackgroundHandler = async () => {
  await messaging().registerDeviceForRemoteMessages();

  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log("Message handled in the background!", remoteMessage);

    store.dispatch(setClickedNotificationData(remoteMessage));
  });
};

if (Platform.OS === "android") {
  setBackgroundHandler();
}
