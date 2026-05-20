import express from 'express';
import { getReminders, setReminders } from '../src/lib/db';
import { addReminder, deleteReminder } from '../src/lib/reminders';
import { validateReminder } from '../src/lib/validation';

const app = express();
app.use(express.json());

app.get('/api/reminders', (req, res) => {
  res.json(getReminders());
});

app.post('/api/reminders', (req, res) => {
  if (!validateReminder(req.body)) {
    return res.status(400).json({ error: 'Validation failed' });
  }
  const list = addReminder(getReminders(), req.body.title);
  setReminders(list);
  res.status(201).json(list[list.length - 1]);
});

app.patch('/api/reminders', (req, res) => {
  const { id, title } = req.body;
  if (!id) return res.status(400).json({ error: 'ID is required' });

  const reminders = getReminders();
  const index = reminders.findIndex(r => r.id === id);
  if (index === -1) return res.status(404).json({ error: 'Not found' });

  if (title) {
    reminders[index].title = title;
  } else {
    reminders[index].completed = !reminders[index].completed;
  }

  setReminders(reminders);
  res.json(reminders[index]);
});

app.delete('/api/reminders', (req, res) => {
  const id = req.query.id as string;
  if (!id) return res.status(400).json({ error: 'ID is required' });

  setReminders(deleteReminder(getReminders(), id));
  res.json({ success: true });
});

export default app;
