export interface Reminder {
  id: string;
  title: string;
  completed: boolean;
}

export const addReminder = (reminders: Reminder[], title: string): Reminder[] => {
  const newReminder: Reminder = {
    id: Math.random().toString(36).substring(2, 11),
    title,
    completed: false,
  };
  return [...reminders, newReminder];
};

export const deleteReminder = (reminders: Reminder[], id: string): Reminder[] => {
  return reminders.filter(reminder => reminder.id !== id);
};

export const toggleReminder = (reminders: Reminder[], id: string): Reminder[] => {
  return reminders.map(reminder =>
    reminder.id === id ? { ...reminder, completed: !reminder.completed } : reminder
  );
};
