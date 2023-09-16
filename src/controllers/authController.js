const { validateToken } = require('../services/token')


//ruta para validar el token.

function requireAuthController(req,res){
    const token = req.cookies.jwt
    if(token){
        console.log(token)
        const validate = validateToken(token)
        if(!validate?.error) res.status(200).json({access:true})
        else res.status(400).json({acess:false, expirate:validate.error})
    } else{
        res.status(400).json({access:false})
    }

}




module.exports ={
    requireAuthController
}