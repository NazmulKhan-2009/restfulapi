const express = require('express');
require('./db/conn')
const studentRouter = require('../src/routers/student');
const courseRouter=require("./routers/courseOffer")
const userRouter=require("./routers/user")


const app=express();
const port=process.env.PORT || 5000;

app.use(express.json())
app.use(studentRouter)
app.use(courseRouter)
app.use(userRouter)

// const errorHandler = (err, req, res, next) => {
//  console.log(res.headersSent)
//  if (res.headersSent) {
//    return next();
//  }
//  res.status(500).json({ error: err });
// }

// app.use(errorHandler);


 

app.listen( port , ()=>console.log(`listening from ${port}`)) ;

