/**
 * @jest-environment node
 */
import request from 'supertest';
import app from '../../backend/app';
import { resetReminders } from '../../src/lib/db';

describe('Reminders API', () => {
  beforeEach(() => {
    resetReminders();
  });

  it('GET /api/reminders returns empty list initially', async () => {
    const res = await request(app).get('/api/reminders');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('POST /api/reminders adds a reminder and returns it', async () => {
    const res = await request(app)
      .post('/api/reminders')
      .send({ title: 'Read a book' });
    expect(res.status).toBe(201);
    expect(res.body.title).toBe('Read a book');
    expect(res.body.completed).toBe(false);
    expect(res.body.id).toBeDefined();
  });

  it('POST /api/reminders returns 400 for validation failure', async () => {
    const res = await request(app)
      .post('/api/reminders')
      .send({ title: 'ab' });
    expect(res.status).toBe(400);
  });

  it('PATCH /api/reminders toggles the completion status', async () => {
    const create = await request(app)
      .post('/api/reminders')
      .send({ title: 'Finish homework' });

    const patch = await request(app)
      .patch('/api/reminders')
      .send({ id: create.body.id });

    expect(patch.status).toBe(200);
    expect(patch.body.completed).toBe(true);
  });

  it('PATCH /api/reminders returns 404 for non-existent id', async () => {
    const res = await request(app)
      .patch('/api/reminders')
      .send({ id: 'nonexistent' });
    expect(res.status).toBe(404);
  });

  it('DELETE /api/reminders removes a reminder', async () => {
    const create = await request(app)
      .post('/api/reminders')
      .send({ title: 'Clean room' });

    const del = await request(app).delete(`/api/reminders?id=${create.body.id}`);
    expect(del.status).toBe(200);

    const get = await request(app).get('/api/reminders');
    expect(get.body.find((r: any) => r.id === create.body.id)).toBeUndefined();
  });
});
