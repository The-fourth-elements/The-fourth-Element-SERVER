require('dotenv').config();
const server = require ('./src/app');
const dbConnect = require('./src/db');
const { PORT, URL } = process.env;

async function main(){
    await dbConnect();
    server.listen(PORT, () => {
        if (URL.includes('localhost')) {
            console.log(`Listening at port: http://localhost:${PORT}`);
        } else {
            console.log(`Listening at port: ${PORT}`);
        }
    })
}

main();