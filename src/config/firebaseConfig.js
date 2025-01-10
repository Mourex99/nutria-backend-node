var admin = require("firebase-admin");

var serviceAccount = require("./nutria-fdfe7-firebase-adminsdk-wrr98-17f3cc57be.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://nutria-fdfe7.firebaseio.com'
});

module.exports = admin;