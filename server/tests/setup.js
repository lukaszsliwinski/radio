// Global setup for tests

const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

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
