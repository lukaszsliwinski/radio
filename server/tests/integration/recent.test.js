// Recently played stations integration tests

const request = require('supertest');
const app = require('../../index');
const formattedStations = require('../__mocks__/formattedStations');

let token;

// Register and login a test user before all tests
beforeAll(async () => {
  const user = { usernameInput: 'RecentTestUser', passwordInput: 'RecentTestPassword123' };

  await request(app).post('/api/register').send(user);
  const response = await request(app).post('/api/login').send(user);
  token = response.body.token;
});

describe('Recently played stations integration tests', () => {
  describe('POST /api/add-recent', () => {
    it('should add a station to the recently played list', async () => {
      const response = await request(app)
        .post('/api/add-recent')
        .set('Authorization', `Bearer ${token}`)
        .send(formattedStations[0]);

      // Check if API returns 201 for creation
      expect(response.status).toBe(201);
      expect(response.body.message).toMatch(/successfully added/i);
    });

    it('should respect limit of 10 stations', async () => {
      // Add all mock stations
      for (const station of formattedStations) {
        await request(app)
          .post('/api/add-recent')
          .set('Authorization', `Bearer ${token}`)
          .send(station);
      }

      const response = await request(app)
        .get('/api/get-recent')
        .set('Authorization', `Bearer ${token}`);

      // Check if API limits list size
      expect(response.status).toBe(200);
      expect(response.body.stations.length).toBeLessThanOrEqual(10);
    });
  });

  // Access without JWT should be rejected
  describe('Access without JWT', () => {
    it('should reject all protected endpoints with 401', async () => {
      const endpoints = [
        request(app).post('/api/add-recent').send(formattedStations[0]),
        request(app).get('/api/get-recent')
      ];

      for (const request of endpoints) {
        const response = await request;

        // Check if return unauthorized
        expect(response.status).toBe(401);
        expect(response.body.error).toBeDefined();
      }
    });
  });
});
