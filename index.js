require('dotenv').config();
const server = require ('./src/app');
const dbConnect = require('./src/db');
const { PORT } = process.env;

server.listen(PORT, () => {
    console.log(`listening at ${PORT}`);
})

dbConnect();

