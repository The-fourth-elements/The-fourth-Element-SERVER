const jwt = require('jsonwebtoken')

const { SECRET_WORD } = require('../constantes/auth')


function createToken(content){
    const payload =  {data: content};
    return jwt.sign(payload, SECRET_WORD, { expiresIn:"5min" });
}


function validateToken(token){
   return jwt.verify(token,SECRET_WORD,(err,decodedToken)=>{
        if(err){
            console.log(decodedToken)
            return {error:err.expiredAt}
        } else {
           return true;
        }
    })
}

function decriptToken(token){
   return jwt.verify(token,SECRET_WORD,(err,decodedToken)=>{
        if(err){
            return {error:err.expiredAt};
        } else {
            console.log(decodedToken);
           return decodedToken;
        }
    })
}

function createRestoreToken(content){
    
    const payload = {
        code: numRandom
    }
    return jwt.sign(payload, SECRET_WORD, { expiresIn: "1min" });
}

module.exports = {
    validateToken,
    createToken,
    createRestoreToken,
    decriptToken
}


