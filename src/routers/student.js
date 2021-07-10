const express = require('express');
const router = new express.Router();
const Student=require("../models/students")
const loginAuth=require("../../middleware/authGaurd")

// router.post('/students' , async(req , res)=>{
//  console.log(req.body);

//  try{
//   const user=new Student(req.body)
//   const createUser=await user.save()
//   res.status(201).send(createUser)
//  }catch(err){
//   res.status(400).send(err)
//  }
 
// })

// //admins
// // router.post('/admins' , (req , res)=>{
// //  console.log(req.body);
// //  const adminPan =new Admin(req.body)
// //  adminPan.save().then(()=>{
// //   res.status(201).send(adminPan)
// //  }).catch(err =>res.status(400).send(err))
 
// // })

// router.get('/students' , async(req , res)=>{

//  try{
// const studentData=await Student.find()
// res.send(studentData)
//  }catch(e){
//   res.send(e)
//  }
// })


// router.get('/students/:id' , async(req , res)=>{
//  try{
// //   const id=req.params.it
// //   const studentData=await Student.findById({_id:id})
// // //or
// //   const _id=req.params.it
// //   const studentData=await Student.findById({_id:_id})
// // //or
// //   const _id=req.params.it
// //   const studentData=await Student.findById({_id})
// // //or
//   const _id=req.params.id
//   const studentData=await Student.findById(_id)

//   if(!studentData){
//     res.status(404 ).send("bad try")
//   }else{
//    res.send(studentData)
//   }
  

//  }catch(e){
//   res.status(500).send(e)
//  }
// })

// //patch

// router.patch('/students/:id' , async(req , res)=>{
//   const _id=req.params.id
//  try{
//   const studentInfo= await Student.findByIdAndUpdate(_id, req.body,{new:true})

//   // find without id the the bellow method used
//   // const studentInfo= await Student.findOneAndUpdate(email/, req.body,{new:true})

//   res.status(200).send(studentInfo)
//   }catch(e){
//     res.status(400).send(e)
//    } ;

// })

// router.delete('/students/:id' , async(req , res)=>{
 
//   try{
//     const delStu= await Student.findByIdAndDelete(req.params.id)
//     if(!req.params.id){
//       return res.status(400).send()
//     }
//     res.status(200).send(delStu)
//    }catch(e){
//      res.status(500).send(e)
//     } ;

// })



//! PRACTICE WITH SUMIT VA MONGOOSE TUTORIA:26

// router.post('/students',async(req,res)=>{
// const stuData=new Student(req.body)
//   await stuData.save((err,data)=>{
//     let error=err
//         if(err){
         
//           // if(err.keyValue.email){
//           //   error=`${err.keyValue.email} already exist try another`
//           // }
//           // if(err.keyValue.phone){
//           //   error=`${err.keyValue.phone} accepted before`
//           // }
         
//           // const emailErr=`${err.keyValue.email} already exist`
          
//           res.status(500).json(error.errors.email.message)
//           // assert.equal(err.keyValue.email, 'Exist the email');
//         }else{
//           res.status(400).json({message:'Successfully created',data})
//         }
//     })
// })

router.post('/students',async(req,res)=>{

  // console.log(loginAuth.userName)
  try{
    const stuData=new Student(req.body)
    await stuData.save()
    res.status(400).json("success")   
   }catch(e){
     res.status(500).json(e.message)
    } ;

})

router.get('/students',loginAuth, async(req,res)=>{
  // console.log(loginAuth)
  console.log(req)
  try{
    await Student
      .find({name:"A.B.M nazmul hossain."})
      .limit(2)
      .select({
        _id:0,
        __v:0,
      })
      .exec((err,docs)=>{
      if(err){
        res.status(500).json("problem")
      }else{
        res.status(400).json(docs)
      }
    })
      
   }catch{
     res.status(400).json('got error')
    } ;  
  
    
}



)
module.exports=router



// echo "# restfulapi" >> README.md
// git init
// git add README.md
// git commit -m "first commit"
// git branch -M main
// git remote add origin https://github.com/NazmulKhan-2009/restfulapi.git
// git push -u origin main