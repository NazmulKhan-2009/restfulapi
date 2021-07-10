const express = require('express')
const router=new express.Router()
const User=require('../models/user')
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const mailgun = require("mailgun-js");

const DOMAIN ='sandbox29e352940d3f4436ab3570871da6bd7c.mailgun.org';

const mg = mailgun({apiKey:"946ff4b1dc204b52b7e7e5b7f664d8ac-1f1bd6a9-df73d674", domain: DOMAIN});



router.post('/signup',async(req,res)=>{
try{
    
    const userName=req.body.userName
    const userEmail=req.body.email
    const password=req.body.password

    const hashPass=await bcrypt.hash(password, 10);
    // const token=jwt.sign({userName,userEmail,password},"mynameiskhan",{expiresIn:"60m"})


  //!verification mail
//   const data = {
// 	from: 'noreply@hello.com',
// 	to: userEmail,
// 	subject: 'Account activation Link',
// 	html: `
//   <h1>Email Activation require</h1>
  
//   <a style="cursor:pointer"; href="http://localhost:5000/authentification/activate/${token}">Click for active ac</a>
//   `
// };
{/* <p>http://localhost:5000/authentification/activate/${token}</p> */}


// mg.messages().send(data, function (error, body) {
//   error ? res.json('Wrong email') : res.json("sending emial for confirmation")
// 	console.log({body});
// });



    const userInfo=new User({userName,password:hashPass})
    await userInfo.save()
    await User.create({userName,userEmail,password:hashPass})
    res.status(200).json("user added successfuly")
 }catch{
   res.status(400).json("something problem")
 } ;
 
 
}

)


router.post('/login',async(req,res)=>{

  try{

    const userName=req.body.userName
    const password=req.body.password
    // const userSendToken=req.headers.token.split(' ')[1]
    console.log(userName)
    // console.log(token.token.split(' ')[1])
      const userList=await User.find({userName})
  console.log(userList.length)
      if(userList.length >0){
  
       const passVal=await bcrypt.compare(password, userList[0].password);
  
       if(passVal){
        const token = jwt.sign({ userName: userList[0].userName}, 'mynameiskhan',{ expiresIn: '1h' });
        
        res.status(200).json({accessToken:token,sms:"succesful login"})
        console.log(token)
       }
       else{
        res.status(200).json('Authentication failed')
       }
          
      }
      else{
        res.status(200).json('Authentication failed')
      }
      
   }catch{
     res.status(400).json("auth fail")
    } ;


  
 
})

router.get("/authentification/activate/:info",async(req,res)=>{
  // res.send('ac verified')
  const decodeJwt=jwt.verify(req.params.info,"mynameiskhan")
  console.log(decodeJwt)
  const {userName,userEmail,password}=decodeJwt

  const userInfo=new User({userName,userEmail,password})
    await userInfo.save((err,doc)=>{
      // err ? console.log("error") :  res.status(200).json("user added successfuly")
      if(err){
        return res.json({error:"error something"})
      }
      return res.json({success:'user added successfuly good'})

    })
    // await User.create({userName,userEmail,password:hashPass})
    
})



module.exports=router