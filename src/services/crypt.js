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
    try {
        return await bcrypt.compare(content, localContent);
    } catch (error) {
        return error;
    }
};

module.exports = {
    encrypt,
    compare
};