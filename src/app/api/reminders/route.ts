import { NextRequest, NextResponse } from 'next/server';
import { addReminder, deleteReminder, toggleReminder } from '@/lib/reminders';
import { validateReminder } from '@/lib/validation';
import { getReminders, setReminders } from '@/lib/db';

export async function GET(request: NextRequest) {
  return NextResponse.json(getReminders());
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!validateReminder(body)) {
      return NextResponse.json({ error: 'Validation failed' }, { status: 400 });
    }
    const reminders = getReminders();
    const updatedList = addReminder(reminders, body.title);
    setReminders(updatedList);
    const created = updatedList[updatedList.length - 1];
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const reminders = getReminders();
    const exists = reminders.some(r => r.id === body.id);
    if (!exists) {
      return NextResponse.json({ error: 'Reminder not found' }, { status: 404 });
    }
    const updatedList = toggleReminder(reminders, body.id);
    setReminders(updatedList);
    const updated = updatedList.find(r => r.id === body.id);
    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }
  const reminders = getReminders();
  const updatedList = deleteReminder(reminders, id);
  setReminders(updatedList);
  return NextResponse.json({ success: true }, { status: 200 });
}
