'use client';

import { useState, useEffect } from 'react';
import { Reminder } from '@/lib/reminders';

export function useReminders() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/reminders').then(res => res.json()).then(data => {
      setReminders(data);
      setLoading(false);
    });
  }, []);

  const add = async (title: string): Promise<boolean> => {
    const res = await fetch('/api/reminders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });
    if (res.ok) {
      const newReminder = await res.json();
      setReminders(prev => [...prev, newReminder]);
      return true;
    }
    return false;
  };

  const remove = async (id: string) => {
    const res = await fetch(`/api/reminders?id=${id}`, { method: 'DELETE' });
    if (res.ok) setReminders(prev => prev.filter(r => r.id !== id));
  };

  const toggle = async (id: string) => {
    const res = await fetch('/api/reminders', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      const updated = await res.json();
      setReminders(prev => prev.map(r => r.id === id ? updated : r));
    }
  };

  const update = async (id: string, newTitle: string) => {
    const res = await fetch('/api/reminders', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, title: newTitle }),
    });
    if (res.ok) {
      const updated = await res.json();
      setReminders(prev => prev.map(r => r.id === id ? updated : r));
    }
  };

  return { reminders, loading, add, remove, toggle, update };
}
