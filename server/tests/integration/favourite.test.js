// Favourite stations integration tests

const request = require('supertest');
const app = require('../../index');
const favStation = require('../__mocks__/favStation');

let token;

// Register and login a test user before all tests
beforeAll(async () => {
  const user = { usernameInput: 'FavTestUser', passwordInput: 'FavTestPassword123' };

  await request(app).post('/api/register').send(user);
  const response = await request(app).post('/api/login').send(user);
  token = response.body.token;
});

describe('Favourites integration tests', () => {
  const station = {
    id: 'db93a00f-9191-46ab-9e87-ec9b373b3eee',
    name: 'Arrow Classic Rock',
    url: 'http://stream.gal.io/arrow',
    favicon: 'https://www.arrow.nl/wp-content/uploads/2020/08/logo.png',
    country: 'The Netherlands'
  };

  describe('POST /api/add-favourite', () => {
    it('should add a station to favourites', async () => {
      const response = await request(app)
        .post('/api/add-favourite')
        .set('Authorization', `Bearer ${token}`)
        .send(favStation);

      // Check if API returns 201 for creation
      expect(response.status).toBe(201);
      expect(response.body.message).toMatch(/added/i);
    });

    it('should not add if the station is already in favourites', async () => {
      await request(app)
        .post('/api/add-favourite')
        .set('Authorization', `Bearer ${token}`)
        .send(favStation);

      const response = await request(app)
        .post('/api/add-favourite')
        .set('Authorization', `Bearer ${token}`)
        .send(favStation);

      // Check if API returns 422 for duplicate
      expect(response.status).toBe(422);
      expect(response.body.message).toMatch(/already/i);
    });
  });

  describe('POST /api/delete-favourite', () => {
    it('should delete a favourite station', async () => {
      await request(app)
        .post('/api/add-favourite')
        .set('Authorization', `Bearer ${token}`)
        .send(favStation);

      const response = await request(app)
        .post('/api/delete-favourite')
        .set('Authorization', `Bearer ${token}`)
        .send({ id: favStation.id });

      expect(response.status).toBe(200);
      expect(response.body.message).toMatch(/removed/i);
    });
  });

  describe('GET /api/get-favourites', () => {
    it('should return all favourites for valid JWT', async () => {
      await request(app)
        .post('/api/add-favourite')
        .set('Authorization', `Bearer ${token}`)
        .send(favStation);

      const response = await request(app)
        .get('/api/get-favourites')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body.stations)).toBe(true);
      expect(response.body.stations.length).toBeGreaterThanOrEqual(1);
      expect(response.body.stations[0]).toHaveProperty('id', favStation.id);
    });
  });

  describe('POST /api/check-favourite', () => {
    it('should confirm a station is in favourites', async () => {
      await request(app)
        .post('/api/add-favourite')
        .set('Authorization', `Bearer ${token}`)
        .send(favStation);

      const response = await request(app)
        .post('/api/check-favourite')
        .set('Authorization', `Bearer ${token}`)
        .send({ id: favStation.id });

      expect(response.status).toBe(200);

      // Check if API returns 'fav' boolean
      expect(response.body.fav).toBe(true);
    });

    it('should return false if station is not in favourites', async () => {
      const response = await request(app)
        .post('/api/check-favourite')
        .set('Authorization', `Bearer ${token}`)
        .send({ id: 'not-existed-id' });

      expect(response.status).toBe(200);
      expect(response.body.fav).toBe(false);
    });
  });

  // Access without JWT should be rejected
  describe('Access without JWT', () => {
    it('should reject all protected endpoints with 401', async () => {
      const endpoints = [
        request(app).post('/api/add-favourite').send(favStation),
        request(app).post('/api/delete-favourite').send({ id: favStation.id }),
        request(app).get('/api/get-favourites'),
        request(app).post('/api/check-favourite').send({ id: favStation.id })
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
