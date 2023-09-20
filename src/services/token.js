const jwt = require('jsonwebtoken')

const { SECRET_WORD } = require('../constantes/auth')


function createToken(content){
    const payload =  {data: content};
    return jwt.sign(payload, SECRET_WORD, { expiresIn: "5min" });
};


function validateToken(req){
    const token = req.cookies.jwt

    return jwt.verify(token,SECRET_WORD,(err,decodedToken)=>{
        if(err){
            console.log(decodedToken)
            return {error:err.expiredAt}
        } else {
           return decodedToken
        }
    });
};

function decriptToken(token){
    return jwt.verify(token,SECRET_WORD,(err,decodedToken)=>{
        if(err) return {error:err.expiredAt};
        else return decodedToken;
    });
};

module.exports = {
    validateToken,
    createToken,
    decriptToken
}


