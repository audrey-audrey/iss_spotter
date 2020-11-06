/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const request = require('request');

/**
 *
 * @param {*} callback - to enter the error handling
 */
const fetchMyIP = (callback) => {
  // use request to fetch IP address from JSON API
  request('https://api.ipify.org/?format=json', function(error, response, body) {
    // error can be set if invalid domain, user is offline, etc.
    if (error) {
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
     
      callback(Error(msg), null); // => Error(...) creates new error that we can pass around
      return;
    }

    // if no errors return ip
    const data = JSON.parse(body);
    const ip = data.ip;

    callback(null, ip);
    
  });
};

const fetchCoordByIP = (ip, callback) => {
  // use request to fetch latitude and longitude
  request(`http://ip-api.com/json/${ip}`, function(error, response, body) {
    // error can be set if invalid domain, user is offline, etc.
    if (error) {
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
       
      callback(Error(msg), null); // => Error(...) creates new error that we can pass around
      return;
    }
  
    // if no errors return ip
    const data = JSON.parse(body);
    const result = {latitude: data.lat, longitude: data.lon};
  
    callback(null, result);
  });
};

/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = function(coords, callback) {

  const lat = coords.latitude;
  const lon = coords.longitude;

  request(`http://api.open-notify.org/iss-pass.json?lat=${lat}&lon=${lon}`, function(error, response, body) {
  // error can be set if invalid domain, user is offline, etc.
    if (error) {
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching ISS Fly Over Times for LAN and LON. Response: ${body}`;
     
      callback(Error(msg), null); // => Error(...) creates new error that we can pass around
      return;
    }

    const data = JSON.parse(body);
    const result = data.response;

    callback(null, result);

  });
};

module.exports = { fetchMyIP, fetchCoordByIP, fetchISSFlyOverTimes };