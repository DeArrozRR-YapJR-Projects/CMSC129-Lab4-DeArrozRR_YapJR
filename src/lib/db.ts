import { Reminder } from './reminders';

let remindersList: Reminder[] = [];

export const getReminders = (): Reminder[] => {
  return remindersList;
};

export const setReminders = (newReminders: Reminder[]): void => {
  remindersList = newReminders;
};

export const resetReminders = (): void => {
  remindersList = [];
};
