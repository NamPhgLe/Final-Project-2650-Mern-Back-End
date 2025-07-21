const request = require('supertest');
const app = require('../app');
import { describe, it, expect } from 'vitest';

describe('Member routes', () => {
  it('should return 401 for protected route if not logged in', async () => {
    const res = await request(app).get('/api/member/profile');
    expect(res.status).toBe(401);
  });
});