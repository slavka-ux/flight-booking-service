import request from 'supertest';
import app from '../src/server';

describe('API Tests', () => {
  it('should return 200 OK from health check', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  it('should return flights from GET /api/flights', async () => {
    const res = await request(app).get('/api/flights');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
