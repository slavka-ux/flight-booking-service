import request from 'supertest';
import app from '../src/server';
import prisma from '../src/config/db';

describe('Auth API', () => {
  const testUser = {
    fullName: 'Test User',
    email: 'auth_test@example.com',
    password: 'password123'
  };

  afterAll(async () => {
    // Очищуємо тестового користувача після тестів
    await prisma.user.deleteMany({ where: { email: testUser.email } });
    await prisma.$disconnect();
  });

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send(testUser);
      
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('token');
    expect(res.body.user).toHaveProperty('email', testUser.email);
  });

  it('should not register user with existing email', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send(testUser);
      
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('message', 'Email already exists');
  });

  it('should login an existing user', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: testUser.email, password: testUser.password });
      
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
  });
});
