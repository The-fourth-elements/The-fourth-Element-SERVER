const { validateToken } = require('../services/token')


//ruta para validar el token.

function requireAuthController(req,res){
    try {
        let token;
    if(req.cookies.jwt){
        token = req.cookies.jwt
    }else if(req.body.token){
        token = req.body.token;
    } else return res.status(400).json({access:false})
    
    if(token){
        const validate = validateToken(token)
        if(!validate?.error) return res.status(200).json({access:true})
        else return res.status(400).json({acess:false, expirate:validate.error})
    } 
     throw Error('token is invalid')
    } catch (error) {
        res.status(400).json({access:false, message:error.message})
    }
    
}





module.exports ={
    requireAuthController
}