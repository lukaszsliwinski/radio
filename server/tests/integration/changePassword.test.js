// Change password integration tests

const request = require('supertest');
const app = require('../../index');

let token;

// Register and login a dedicated test user
beforeAll(async () => {
  const user = { usernameInput: 'ChangePassUser', passwordInput: 'OldPassword123' };

  await request(app).post('/api/register').send(user);
  const response = await request(app).post('/api/login').send(user);
  token = response.body.token;
});

describe('Change password integration tests', () => {
  describe('POST /api/change-password', () => {
    it('should change password successfully', async () => {
      const newPassword = 'NewPassword123';

      // Change password
      const changeResponse = await request(app)
        .post('/api/change-password')
        .set('Authorization', `Bearer ${token}`)
        .send({ passwordInput: newPassword });

      // Check if API returns 201
      expect(changeResponse.status).toBe(201);
      expect(changeResponse.body.message).toMatch(/successfully changed/i);

      // Try logging in with new password
      const loginResponse = await request(app)
        .post('/api/login')
        .send({ usernameInput: 'ChangePassUser', passwordInput: newPassword });

      expect(loginResponse.status).toBe(200);
      expect(loginResponse.body.token).toBeDefined();
      expect(loginResponse.body.username).toBe('ChangePassUser');
    });

    it('should reject invalid password format', async () => {
      const invalidPassword = 'short';

      const response = await request(app)
        .post('/api/change-password')
        .set('Authorization', `Bearer ${token}`)
        .send({ passwordInput: invalidPassword });

      // API should return 400 for invalid format
      expect(response.status).toBe(400);
      expect(response.body.message).toMatch(/incorrect password format/i);
    });
  });

  // Access without JWT should be rejected
  describe('Access without JWT', () => {
    it('should reject request with 401', async () => {
      const response = await request(app)
        .post('/api/change-password')
        .send({ passwordInput: 'AnotherPass123' });

      expect(response.status).toBe(401);
      expect(response.body.error).toBeDefined();
    });
  });
});
