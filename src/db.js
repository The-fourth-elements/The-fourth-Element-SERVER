const mongoose = require('mongoose');
require('dotenv').config();
const { DB_URI } = process.env;
const dbConnect = () => {
    mongoose.connect(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })};

module.exports = dbConnect;