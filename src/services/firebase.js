const admin = require("firebase-admin");

const firebase = admin.initializeApp({
    credential: admin.credential.applicationDefault()
});

module.exports = {
    auth: firebase.auth()
};

