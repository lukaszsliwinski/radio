// Auth integration tests

const mongoose = require('mongoose');
const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../../index');

let mongoServer;

beforeAll(async () => {
  // Setup mongodb-memory-server before all tests
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  // Disconnect and stop mongodb-memory-server
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  // Clean up collections after every test
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});

describe('Auth integration tests', () => {
  const user = { usernameInput: 'TestUser', passwordInput: 'TestPassword123' };
  let token;

  it('should register a new user and login', async () => {
    // Register test user
    const registerResponse = await request(app).post('/api/register').send(user);
    expect(registerResponse.status).toBe(201);
    expect(registerResponse.body.message).toBe('Account successfully created.');

    // Login
    const loginResponse = await request(app).post('/api/login').send(user);
    expect(loginResponse.status).toBe(200);
    expect(loginResponse.body.token).toBeDefined();

    // Save token for subsequent protected endpoint tests
    token = loginResponse.body.token;
  });

  describe('Test protected /api/get-user endpoint', () => {
    it('should access protected endpoint with valid token', async () => {
      const response = await request(app)
        .get('/api/get-user')
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);

      // Check if returned username is correct
      expect(response.body.username).toBe(user.usernameInput);

      // Check if sensitive data like password is NOT exposed
      expect(response.body).not.toHaveProperty('password');
    });

    it('should not access protected endpoint without token', async () => {
      const response = await request(app).get('/api/get-user');
      expect(response.status).toBe(401);

      // Check the error
      expect(response.body.error).toBeDefined();
    });

    it('should not access protected endpoint with invalid token', async () => {
      const response = await request(app)
        .get('/api/get-user')
        .set('Authorization', 'Bearer randomInvalidToken123');
      expect(response.status).toBe(401);

      // Check the error
      expect(response.body.error).toBeDefined();
    });
  });
});
