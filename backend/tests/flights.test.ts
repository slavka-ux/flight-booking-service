import request from 'supertest';
import app from '../src/server';

describe('Flights API', () => {
  it('should get all flights', async () => {
    const res = await request(app).get('/api/flights');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should search flights by origin', async () => {
    const res = await request(app).get('/api/flights?origin=LHR');
    expect(res.status).toBe(200);
    if (res.body.length > 0) {
      expect(res.body[0].origin).toBe('LHR');
    }
  });

  it('should return 404 for non-existent flight id', async () => {
    const res = await request(app).get('/api/flights/invalid-id-123');
    expect(res.status).toBe(404);
  });
});
