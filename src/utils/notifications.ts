
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

export const scheduleAcademicReminders = async () => {
  try {
    const hasPermission = await requestNotificationPermissions();
    if (!hasPermission) return false;

    // Schedule some example academic reminders
    const now = new Date();
    
    // Course registration deadline reminder
    const registrationDeadline = new Date(now.getTime() + (24 * 60 * 60 * 1000)); // 1 day from now
    await scheduleNotification(
      '📚 Course Registration Reminder',
      'Course registration deadline is approaching! Only 5 days left.',
      registrationDeadline
    );

    // Exam reminder
    const examReminder = new Date(now.getTime() + (2 * 24 * 60 * 60 * 1000)); // 2 days from now
    await scheduleNotification(
      '📝 Upcoming Exam',
      'Computer Science 301 exam is in 3 days. Time to prepare!',
      examReminder
    );

    return true;
  } catch (error) {
    console.error('Error scheduling academic reminders:', error);
    return false;
  }
};
