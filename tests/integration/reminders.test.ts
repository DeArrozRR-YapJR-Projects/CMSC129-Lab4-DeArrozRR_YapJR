/**
 * @jest-environment node
 */
import { NextRequest } from 'next/server';
import { GET, POST, PATCH, DELETE } from '@/app/api/reminders/route';

describe('Reminders API Integration Tests', () => {
  it('GET /api/reminders returns empty list initially', async () => {
    const req = new NextRequest('http://localhost:3000/api/reminders');
    const res = await GET(req);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toEqual([]);
  });

  it('POST /api/reminders adds a reminder and returns it', async () => {
    const req = new NextRequest('http://localhost:3000/api/reminders', {
      method: 'POST',
      body: JSON.stringify({ title: 'Read a book' }),
    });
    const res = await POST(req);
    expect(res.status).toBe(201);
    const body = await res.json();
    expect(body.title).toBe('Read a book');
    expect(body.completed).toBe(false);
    expect(body.id).toBeDefined();
  });

  it('POST /api/reminders returns 400 for validation failure', async () => {
    const req = new NextRequest('http://localhost:3000/api/reminders', {
      method: 'POST',
      body: JSON.stringify({ title: 'ab' }),
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it('PATCH /api/reminders toggles the completion status', async () => {
    const createReq = new NextRequest('http://localhost:3000/api/reminders', {
      method: 'POST',
      body: JSON.stringify({ title: 'Finish homework' }),
    });
    const createRes = await POST(createReq);
    expect(createRes.status).toBe(201);
    const reminder = await createRes.json();

    const patchReq = new NextRequest('http://localhost:3000/api/reminders', {
      method: 'PATCH',
      body: JSON.stringify({ id: reminder.id }),
    });
    const patchRes = await PATCH(patchReq);
    expect(patchRes.status).toBe(200);
    const updated = await patchRes.json();
    expect(updated.completed).toBe(true);
  });

  it('DELETE /api/reminders deletes the reminder', async () => {
    const createReq = new NextRequest('http://localhost:3000/api/reminders', {
      method: 'POST',
      body: JSON.stringify({ title: 'Clean room' }),
    });
    const createRes = await POST(createReq);
    expect(createRes.status).toBe(201);
    const reminder = await createRes.json();

    const deleteReq = new NextRequest(`http://localhost:3000/api/reminders?id=${reminder.id}`, {
      method: 'DELETE',
    });
    const deleteRes = await DELETE(deleteReq);
    expect(deleteRes.status).toBe(200);

    const getReq = new NextRequest('http://localhost:3000/api/reminders');
    const getRes = await GET(getReq);
    const body = await getRes.json();
    expect(body.find((r: any) => r.id === reminder.id)).toBeUndefined();
  });
});
