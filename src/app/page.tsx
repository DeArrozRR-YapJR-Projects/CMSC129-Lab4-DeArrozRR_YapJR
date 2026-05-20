'use client';

import { useState } from 'react';
import ReminderItem from '@/app/components/ReminderItem';
import { useReminders } from '@/app/hooks/useReminders';

export default function RemindersPage() {
  const { reminders, loading, add, remove, toggle, update } = useReminders();
  const [inputValue, setInputValue] = useState('');

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim().length < 3) return;
    const success = await add(inputValue);
    if (success) setInputValue('');
  };

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="p-6 bg-blue-600 text-white font-bold text-2xl">Reminders</div>
        <div className="p-6">
          <form onSubmit={handleAdd} className="flex gap-2 mb-6">
            <input
              type="text" placeholder="Enter a reminder..."
              className="flex-1 px-4 py-2 border rounded-lg text-black"
              value={inputValue} onChange={(e) => setInputValue(e.target.value)}
            />
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">Add</button>
          </form>
          {loading ? <p>Loading...</p> : (
            <ul className="space-y-3">
              {reminders.map(r => (
                <ReminderItem key={r.id} reminder={r} onDelete={remove} onUpdate={update} onToggle={toggle} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
}
