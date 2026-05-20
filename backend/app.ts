import express from 'express';

const app = express();
app.use(express.json());

app.all('/api/reminders', (req, res) => {
  res.status(501).json({ error: 'Not implemented' });
});

export default app;
