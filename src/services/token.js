const jwt = require('jsonwebtoken')

const {SECRET_WORD} = require('../constantes/auth')


function createToken(content){
    const payload =  {data: content}
    return jwt.sign(payload,SECRET_WORD,{expiresIn:"1d"});
}


function validateToken(token){
   return jwt.verify(token,SECRET_WORD,(err,decodedToken)=>{
        if(err){
            console.log(decodedToken)
            return {error:err.expiredAt}
        } else {
           return true
        }
    })
}

module.exports = {
    validateToken,
    createToken
}


