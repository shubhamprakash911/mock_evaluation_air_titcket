const jwt= require("jsonwebtoken")
require("dotenv").config()


const authantication=(req,res,next)=>{
    let token=req.headers.authorization
    console.log(token)
    if(token){
         jwt.verify(token,process.env.secretKey,(err,decoded)=>{
            if(decoded){
                req.body.userId=decoded.userId
                next()
            }else{
                res.send({"msg":"not authorized"})
            }
         })
    }else{
        res.send({"msg":"not authorized"})
    }
}

module.exports={authantication}