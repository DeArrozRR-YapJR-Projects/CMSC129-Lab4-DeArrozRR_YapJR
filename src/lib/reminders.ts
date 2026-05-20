export interface Reminder {
  id: string;
  title: string;
  completed: boolean;
}

export const addReminder = (reminders: Reminder[], title: string): Reminder[] => {
  throw new Error('Not implemented');
};

export const deleteReminder = (reminders: Reminder[], id: string): Reminder[] => {
  throw new Error('Not implemented');
};

export const toggleReminder = (reminders: Reminder[], id: string): Reminder[] => {
  throw new Error('Not implemented');
};
