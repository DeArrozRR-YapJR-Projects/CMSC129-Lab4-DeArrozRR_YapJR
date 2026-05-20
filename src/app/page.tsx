'use client';
    
     import { useState, useEffect } from 'react';
     import { Reminder } from '@/lib/reminders';
  
     export default function RemindersPage() {
       const [reminders, setReminders] = useState<Reminder[]>([]);
       const [inputValue, setInputValue] = useState('');
        const [loading, setLoading] = useState(true);
   
      // Fetch reminders on load
      useEffect(() => {
        fetch('/api/reminders')
          .then((res) => res.json())
          .then((data) => {
            setReminders(data);
            setLoading(false);
          });
      }, []);
   
      const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        if (inputValue.trim().length < 3) return;
   
        const res = await fetch('/api/reminders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: inputValue }),
        });
   
        if (res.ok) {
          const newReminder = await res.json();
          setReminders([...reminders, newReminder]);
          setInputValue('');
        }
      };
   
      const handleDelete = async (id: string) => {
        const res = await fetch(`/api/reminders?id=${id}`, {
          method: 'DELETE',
        });
   
        if (res.ok) {
          setReminders(reminders.filter((r) => r.id !== id));
       }
      };
   
      return (
        <main className="min-h-screen bg-gray-50 py-10 px-4">
          <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden
      border border-gray-100">
            <div className="p-6 bg-blue-600">
              <h1 className="text-2xl font-bold text-white">Reminders</h1>
            </div>
   
            <div className="p-6">
              <form onSubmit={handleAdd} className="flex gap-2 mb-6">
                <input
                  type="text"
                  placeholder="Enter a reminder..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg
      focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg
      hover:bg-blue-700 transition"
               >
                  Add
                </button>
              </form>
   
              {loading ? (
                <p className="text-center text-gray-500 italic">Loading...</p>
              ) : reminders.length === 0 ? (
                <p className="text-center text-gray-500 italic">No reminders yet.</p>
              ) : (
                <ul className="space-y-3">
                  {reminders.map((reminder) => (
                   <li
                      key={reminder.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-xl
      border border-gray-200"
                    >
                      <span className="text-gray-800 font-medium">{reminder.title}</span>
                      <button
                        onClick={() => handleDelete(reminder.id)}
                        className="text-red-500 hover:text-red-700 font-bold p-1"
                        aria-label="Delete"
                      >
                        ✕
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </main>
      );
    }