const axios = require('axios');

const searchByName = (name) => {
  // posible api hosts
  const de2 = axios.get(`https://de2.api.radio-browser.info/json/stations/byname/${name}?limit=50`);
  const fi1 = axios.get(`https://fi1.api.radio-browser.info/json/stations/byname/${name}?limit=50`);
  const requests = [de2, fi1];

  // get stations from one of three endpoints
  return Promise.any(requests);
};

const formatResponse = (responseData) => {
  let formattedStations = [];

  // list for urls to prevent repetitions
  let urls = [];

  responseData.forEach((element) => {
    let newFavicon;
    element.favicon === ''
      ? (newFavicon = 'api/img/default-radio-icon')
      : (newFavicon = element.favicon);

    // don't add station if the url exists it the list and has disallowed format
    if (
      !urls.includes(element.url) &&
      !['.m3u8', '.m3u', '?mp=/stream', '.pls'].some((format) => element.url.includes(format)) &&
      element.url.split(':').length - 1 == 1 // don't add station if url contains port number
    ) {
      formattedStations.push({
        id: element.stationuuid,
        name: element.name,
        url: element.url,
        favicon: newFavicon,
        country: element.country
      });
    }

    urls.push(element.url);
  });

  return formattedStations;
};

module.exports = {
  searchByName,
  formatResponse
};
