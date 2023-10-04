require('dotenv').config();
const server = require ('./src/app');
const dbConnect = require('./src/db');
const { PORT } = process.env;

async function main(){
    await dbConnect();
    server.listen(PORT, () => {
        console.log(`Listening at port: ${PORT}`);
    })
}

main()