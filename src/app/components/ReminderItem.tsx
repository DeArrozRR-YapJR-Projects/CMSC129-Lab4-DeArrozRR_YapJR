'use client';

import { useState } from 'react';
import { Reminder } from '@/lib/reminders';

export default function ReminderItem({
  reminder,
  onDelete,
  onUpdate,
  onToggle
}: {
  reminder: Reminder,
  onDelete: (id: string) => void,
  onUpdate: (id: string, newTitle: string) => void,
  onToggle: (id: string) => void
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(reminder.title);

  const handleUpdate = () => {
    if (editValue.trim().length >= 3) {
      onUpdate(reminder.id, editValue);
      setIsEditing(false);
    }
  };

  return (
    <li className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
      {isEditing ? (
        <div className="flex gap-2 w-full">
          <input
            className="flex-1 px-2 py-1 border rounded text-black"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            autoFocus
          />
          <button onClick={handleUpdate} className="text-green-600 font-bold">Save</button>
          <button onClick={() => setIsEditing(false)} className="text-gray-500">Cancel</button>
        </div>
      ) : (
        <>
          <span className={`text-gray-800 font-medium ${reminder.completed ? 'line-through text-gray-400' : ''}`}>
            {reminder.title}
          </span>
          <div className="flex items-center gap-4">
            {reminder.completed && (
              <span data-testid="status" className="text-green-600 text-sm font-medium">Done</span>
            )}
            <button
              onClick={() => onToggle(reminder.id)}
              className={`${reminder.completed ? 'text-yellow-500' : 'text-green-500'} hover:text-green-700`}
            >
              {reminder.completed ? 'Undo' : 'Complete'}
            </button>
            <button onClick={() => setIsEditing(true)} className="text-blue-500 hover:text-blue-700">Edit</button>
            <button onClick={() => onDelete(reminder.id)} className="text-red-500 hover:text-red-700 font-bold">Delete</button>
          </div>
        </>
      )}
    </li>
  );
}
