import { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import { PermissionsAndroid, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NOTIFICATION_DEFAULT_CHANNEL_ID } from './config';
import notifee, { AndroidImportance, EventType } from '@notifee/react-native';
import store from '../redux/store';
import { setClickedNotificationData } from '../redux/notifications/notifications-actions';
import { handleNotificationClick } from './notificationClickHandler';

export async function requestNotificationPermissions() {
  try {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Notification permission status:', authStatus);
    }

    // Android 13+ needs runtime POST_NOTIFICATIONS permission
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      const permission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );

      if (permission !== PermissionsAndroid.RESULTS.GRANTED) {
        console.warn('Notification permission not granted');
      }
    }

    await notifee.requestPermission();

    if (Platform.OS === 'android') {
      await notifee.createChannel({
        id: NOTIFICATION_DEFAULT_CHANNEL_ID,
        name: 'Default Channel',
        importance: AndroidImportance.HIGH,
      });
    }
  } catch (err) {
    console.log(err, 'requestNotificationPermissions');
  }
}

export async function getFcmToken() {
  try {
    await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken();

    console.log(token, 'fcm token');
    if (token) {
      // Save token to your server or local storage
    } else {
      console.log('Failed to get FCM token');
    }
    return token;
  } catch (error) {
    console.error('Error getting FCM token:', error);
  }
}

const usePushNotifications = () => {
  useEffect(() => {
    async function setupFCM() {
      await requestNotificationPermissions();
      const token = await getFcmToken();

      AsyncStorage.setItem('deviceToken', token);
      console.log('Current FCM token:', token);
    }

    setupFCM();
  }, []);

  useEffect(() => {
    // Foreground press events
    const unsubscribe = notifee.onForegroundEvent(({ type, detail }) => {
      if (type === EventType.PRESS) {
        handleNotificationClick(detail?.notification);
      }
    });

    async function getInitialNotification() {
      const message = await messaging().getInitialNotification();

      if (message) {
        store.dispatch(setClickedNotificationData(message));
      }
    }

    getInitialNotification();

    return unsubscribe;
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onNotificationOpenedApp(remoteMessage => {
      if (remoteMessage && remoteMessage?.messageId) {
        store.dispatch(setClickedNotificationData(remoteMessage));
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);
};

export default usePushNotifications;
