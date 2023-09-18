require('dotenv').config();
const server = require ('./src/app');
const dbConnect = require('./src/db');
const { PORT } = process.env;

server.listen(3001, () => {
    console.log(`listening at ${PORT}`);
})

dbConnect();