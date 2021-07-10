const express=require('express');
const router=express.Router()
const Course=require('../models/course')

// console.log("page:5 ", new Course)
router.post('/course',async(req,res)=>{
 try{
  // const course=new Course(req.body)
  
  // await course.save()

//! also run bellow code
  // await course.create(req.body)


  const course=new Course()
  const data=await course.addCourse(req.body)
  
  res.status(200).json(data)
  }catch(e){
    res.status(400).json("you in Wrong way")
  } ;
  
})

router.get('/course',async(req,res)=>{
 try{
     const data=await Course.find()
     res.status(200).json(data)
  }catch(e){
    res.status(400).json('wrong get')
  } ;
})

router.get('/active',async(req,res)=>{

 try{
  const course=new Course()
 
  const data=await course.findActive({running:"active"})

  //! also can be
   // const data=await Course.findActive()
  
   // const data=await Course.find({running:"inactive"})
  res.status(200).json(data)

 }catch{
res.status(400).json("wronh active docs")
 }

 
})

router.get('/search', async(req,res)=>{
 const data=await Course.findBySome("react")
 res.status(200).json(data)

})

router.get('/fee', async(req,res)=>{
  const data=await Course.find().byFee(4000)
  res.status(200).json(data)
 
 })



module.exports=router


