const bcrypt = require('bcrypt');

// hash para password
async function encrypt(content) {
    if (content) {
        const salt = await bcrypt.genSalt();
        return await bcrypt.hash(content, salt) //const salt = await bcrypt.genSalt();
    }
    throw Error('content is empty');
};

async function compare(content, localContent) {
    console.log(content, localContent);
    if (content == localContent) {
        return true;
    } else {
        return false;
    }
    // if (content) return async () => await bcrypt.compare(content, localContent);
    // else throw Error('content is empty');
};

module.exports = {
    encrypt,
    compare
};