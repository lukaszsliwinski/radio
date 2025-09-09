// Search service unit tests

const axios = require('axios');
const { searchByName, formatResponse } = require('../../services/search.service');
const mockStations = require('../__mocks__/mockStations');

// Mock axios to avoid real HTTP requests
jest.mock('axios');

describe('Search service unit tests', () => {
  const testQuery = 'rock';

  describe('searchByName', () => {
    it('should return data from the first successful endpoint', async () => {
      // First endpoint fails, second succeeds
      axios.get
        .mockRejectedValueOnce(new Error('de2 down'))
        .mockResolvedValueOnce({ data: mockStations });

      const result = await searchByName(testQuery);

      expect(axios.get).toHaveBeenCalledTimes(2);
      expect(axios.get).toHaveBeenCalledWith(
        `${process.env.API_URL_1}/json/stations/byname/${testQuery}?limit=50`
      );
      expect(axios.get).toHaveBeenCalledWith(
        `${process.env.API_URL_1}/json/stations/byname/${testQuery}?limit=50`
      );

      expect(result).toEqual({ data: mockStations });
    });
  });

  describe('formatResponse', () => {
    it('should replace empty favicon with default icon', () => {
      // Pick station with empty favicon and valid URL
      const station = mockStations.find(station => 
        station.favicon === '' &&
        !['.m3u8', '.m3u', '?mp=/stream', '.pls'].some(format => station.url.includes(format)) &&
        station.url.split(':').length - 1 === 1
      );
      const result = formatResponse([station]);

      expect(result[0].favicon).toBe('api/img/default-radio-icon');
    });

    it('should filter out stations with duplicate URLs', () => {
      const station = mockStations[0];
      const duplicateInput = [station, { ...station }];

      const result = formatResponse(duplicateInput);

      expect(result.length).toBe(1);
      expect(result[0].id).toBe(station.stationuuid);
    });

    it('should filter out stations with invalid URL formats or port numbers', () => {
      const invalidUrlStations = mockStations.filter(station =>
        ['.m3u8', '.m3u', '?mp=/stream', '.pls'].some(format => station.url.includes(format)) ||
        station.url.split(':').length - 1 !== 1
      );

      const result = formatResponse(invalidUrlStations);
      expect(result).toEqual([]);
    });
  });
});
