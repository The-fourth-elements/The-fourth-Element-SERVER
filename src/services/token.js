const jwt = require('jsonwebtoken')
const { SECRET_WORD } = require('../utils/auth')

function createToken(content) {
    const payload = { data: content };
    return jwt.sign(payload, SECRET_WORD, { expiresIn: "100min" });
};

function decriptToken(token) {
    try {
        return jwt.verify(token, SECRET_WORD, (err, decodedToken) => {
            if (err) throw Error(err);
            else return decodedToken;
        });
    } catch (error) {
        return { error: error.message }
    }
};

module.exports = {
    createToken,
    decriptToken
}


