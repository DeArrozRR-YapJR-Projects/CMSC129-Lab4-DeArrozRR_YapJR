import express from 'express';
import { getReminders, setReminders } from '../src/lib/db';
import { addReminder, deleteReminder } from '../src/lib/reminders';
import { validateReminder } from '../src/lib/validation';

const app = express();
app.use(express.json());

function getQueryId(req: express.Request): string | null {
  return (req.query.id as string) || null;
}

function getBodyId(req: express.Request): string | null {
  return req.body?.id || null;
}

function findReminderIndex(id: string): number {
  return getReminders().findIndex(r => r.id === id);
}

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
  const id = getBodyId(req);
  if (!id) return res.status(400).json({ error: 'ID is required' });

  const index = findReminderIndex(id);
  if (index === -1) return res.status(404).json({ error: 'Not found' });

  const reminders = getReminders();
  if (req.body.title) {
    reminders[index].title = req.body.title;
  } else {
    reminders[index].completed = !reminders[index].completed;
  }
  setReminders(reminders);

  res.json(reminders[index]);
});

app.delete('/api/reminders', (req, res) => {
  const id = getQueryId(req);
  if (!id) return res.status(400).json({ error: 'ID is required' });

  setReminders(deleteReminder(getReminders(), id));
  res.json({ success: true });
});

export default app;
