'use client';
     
      import { useState, useEffect } from 'react';
      import { Reminder } from '@/lib/reminders';
      import ReminderItem from '@/app/components/ReminderItem';
    
     export default function RemindersPage() {
       const [reminders, setReminders] = useState<Reminder[]>([]);
       const [inputValue, setInputValue] = useState('');
       const [loading, setLoading] = useState(true);
    
       useEffect(() => {
         fetch('/api/reminders').then(res => res.json()).then(data => {
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
         const res = await fetch(`/api/reminders?id=${id}`, { method: 'DELETE' });
         if (res.ok) setReminders(reminders.filter(r => r.id !== id));
       };
    
        const handleToggle = async (id: string) => {
          const res = await fetch('/api/reminders', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id }),
          });
          if (res.ok) {
            const updated = await res.json();
            setReminders(reminders.map(r => r.id === id ? updated : r));
          }
        };

        const handleUpdate = async (id: string, newTitle: string) => {
         const res = await fetch('/api/reminders', {
           method: 'PATCH',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({ id, title: newTitle }), // We send the new title
         });
         if (res.ok) {
           const updated = await res.json();
           setReminders(reminders.map(r => r.id === id ? updated : r));
         }
       };
    
       return (
         <main className="min-h-screen bg-gray-50 py-10 px-4">
           <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden
       border border-gray-100">
             <div className="p-6 bg-blue-600 text-white font-bold text-2xl">Reminders</div>
             <div className="p-6">
              <form onSubmit={handleAdd} className="flex gap-2 mb-6">
                <input
                  type="text" placeholder="Enter a reminder..."
                  className="flex-1 px-4 py-2 border rounded-lg text-black"
                  value={inputValue} onChange={(e) => setInputValue(e.target.value)}
                />
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white
       rounded-lg">Add</button>
              </form>
              {loading ? <p>Loading...</p> : (
                <ul className="space-y-3">
                  {reminders.map(r => (
<ReminderItem key={r.id} reminder={r} onDelete={handleDelete}
        onUpdate={handleUpdate} onToggle={handleToggle} />
                  ))}
                </ul>
              )}
            </div>
          </div>
       </main>
      );
    }