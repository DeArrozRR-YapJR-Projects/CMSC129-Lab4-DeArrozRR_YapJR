import { NextRequest, NextResponse } from 'next/server';
import { Reminder, addReminder, deleteReminder, toggleReminder } from '@/lib/reminders';
import { validateReminder } from '@/lib/validation';

let remindersList: Reminder[] = [];

export async function GET(request: NextRequest) {
  return NextResponse.json(remindersList);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!validateReminder(body)) {
      return NextResponse.json({ error: 'Validation failed' }, { status: 400 });
    }
    remindersList = addReminder(remindersList, body.title);
    const created = remindersList[remindersList.length - 1];
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const exists = remindersList.some(r => r.id === body.id);
    if (!exists) {
      return NextResponse.json({ error: 'Reminder not found' }, { status: 404 });
    }
    remindersList = toggleReminder(remindersList, body.id);
    const updated = remindersList.find(r => r.id === body.id);
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
  remindersList = deleteReminder(remindersList, id);
  return NextResponse.json({ success: true }, { status: 200 });
}
