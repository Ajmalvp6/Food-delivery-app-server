const jwt = require('jsonwebtoken')

exports.verifytoken=(req,res,next)=>{

    try{const token = req.headers['authorization']

    if(!token){
        return res.status(404).json({message:'No Token Provided please provide token'})
    }

    const JWTResponse =  jwt.verify(token.split(" ")[1],process.env.JWTKEY)


    req.payload = JWTResponse.userId

    next()}

    catch(error){
        res.status(404).json({message:"invalid or expired token"})
    }

    
    
}
