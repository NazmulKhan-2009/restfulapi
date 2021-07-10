var jwt = require('jsonwebtoken');

const loginAuth=async(req,res,next)=>{
 const token=req.headers.token.split(' ')[1]
 try{
  
  const decodeJwt=await jwt.verify(token, process.env.JWT_PASS)
  req.userName=decodeJwt.userName
  req.sms="cool"
  next()
  }catch(e){
    
    // next(`it is an erron ${e}`)
    res.status(400).json(e.name)
  } ;
   
}

module.exports=loginAuth