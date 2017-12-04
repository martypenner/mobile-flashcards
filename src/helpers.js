import { Notifications, Permissions } from 'expo';
import { Alert, AsyncStorage } from 'react-native';

const NOTIFICATION_KEY = 'mobile-flashcards:notifications';

export const createNotification = () => ({
  title: 'Challenge yourself!',
  body: "👋 don't forget to take a quiz today!",
  ios: {
    sound: true
  },
  android: {
    sound: true,
    priority: 'high',
    sticky: false,
    vibrate: true
  }
});

export const setLocalNotification = () =>
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then(data => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          if (status === 'granted') {
            Notifications.cancelAllScheduledNotificationsAsync();

            let tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(20);
            tomorrow.setMinutes(0);
            tomorrow.setSeconds(0);

            Notifications.scheduleLocalNotificationAsync(createNotification(), {
              time: tomorrow,
              repeat: 'day'
            });

            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
          }
        });
      }
    });

export const clearLocalNotification = () =>
  AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync
  );
