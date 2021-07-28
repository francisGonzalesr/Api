var admin = require('firebase-admin');

var serviceAccount = require('./credential');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;