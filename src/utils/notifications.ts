
import { LocalNotifications } from '@capacitor/local-notifications';

export const scheduleNotification = async (title: string, body: string, scheduleAt: Date) => {
  try {
    await LocalNotifications.schedule({
      notifications: [
        {
          title,
          body,
          id: Math.floor(Math.random() * 10000),
          schedule: { at: scheduleAt },
          sound: 'default',
          attachments: undefined,
          actionTypeId: "",
          extra: null
        }
      ]
    });
  } catch (error) {
    console.error('Error scheduling notification:', error);
  }
};

export const requestNotificationPermissions = async () => {
  try {
    const result = await LocalNotifications.requestPermissions();
    return result.display === 'granted';
  } catch (error) {
    console.error('Error requesting notification permissions:', error);
    return false;
  }
};
