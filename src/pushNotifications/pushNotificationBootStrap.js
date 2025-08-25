import { NOTIFICATION_DEFAULT_CHANNEL_ID } from './config';
import { handleNotificationClick } from './notificationClickHandler';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

messaging().onTokenRefresh(token => {
  console.log('New FCM Token:', token);

  AsyncStorage.setItem('deviceToken', token);
  // Update token on your server
});

messaging().onMessage(async remoteMessage => {
  const userInteracton = remoteMessage.userInteraction;

  if (remoteMessage?.data?.sendedFromApp !== 'true') {
    await notifee.displayNotification({
      title: remoteMessage.data?.title || '',
      body: remoteMessage.data?.body || '',

      data: {
        title: remoteMessage.data?.title || '',
        body: remoteMessage.data?.body || '',
        product_id: remoteMessage.data?.product_id || '',
        merchant_id: remoteMessage.data?.merchant_id || '',
        sendedFromApp: 'true',
      },
      android: {
        channelId: NOTIFICATION_DEFAULT_CHANNEL_ID,
        pressAction: { id: 'default' },
        smallIcon: 'bootsplash_logo',
      },
    });

    return;
  }

  if (userInteracton) {
    handleNotificationClick(notification);
    return;
  }
});
