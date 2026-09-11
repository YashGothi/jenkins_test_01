const request = require('supertest');
const { app, add } = require('./app');

describe('add()', () => {
  test('adds two numbers correctly', () => {
    expect(add(2, 3)).toBe(5);
  });

  test('handles negative numbers', () => {
    expect(add(-2, 5)).toBe(3);
  });
});

describe('GET /', () => {
  test('responds with a welcome message', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/Hello/);
  });
});

describe('GET /health', () => {
  test('responds with status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });
});
