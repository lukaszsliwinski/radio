// Search stations integration tests

const request = require('supertest');
const app = require('../../index');
const axios = require('axios');
const mockStations = require('../__mocks__/mockStations');
const formattedStations = require('../__mocks__/formattedStations');

// Mock axios to avoid real HTTP requests
jest.mock('axios');

describe('Search stations integration tests', () => {
  const testQuery = 'rock';

  it('should return formatted stations', async () => {
    // Mock axios get request
    axios.get.mockResolvedValueOnce({ data: mockStations });

    const response = await request(app)
      .post('/api/search')
      .send({ query: testQuery });

    expect(response.status).toBe(200);
    expect(response.body.stations).toBeDefined();
    expect(Array.isArray(response.body.stations)).toBe(true);
    expect(response.body.stations.length).toBe(33);

    // Check formatted response
    const station = response.body.stations[0];
    expect(station).toEqual(formattedStations[0]);
  });

  it('should handle empty results', async () => {
    axios.get.mockResolvedValueOnce({ data: [] });

    const response = await request(app)
      .post('/api/search')
      .send({ query: 'nonexistentstation' });

    expect(response.status).toBe(200);
    expect(response.body.stations).toEqual([]);
  });

  it('should return 500 for external API errors', async () => {
    axios.get.mockRejectedValueOnce(new Error('Network error'));

    const response = await request(app)
      .post('/api/search')
      .send({ query: testQuery });

    expect(response.status).toBe(500);
    expect(response.body.message).toMatch(/external server error/i);
  });
});
