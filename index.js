// // index.js
const { fetchMyIP, fetchCoordByIP, fetchISSFlyOverTimes } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });

// fetchCoordByIP('142.116.117.56', (error, result) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned Coodinates:' , result);
// });

// fetchISSFlyOverTimes({ latitude: 43.7012, longitude: -79.3877 }, (error, result) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned ISS Fly Over Times' , result);
// });