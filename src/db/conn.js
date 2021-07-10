const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/students-api" ,{
 useCreateIndex:true,
 useNewUrlParser:true,
 useUnifiedTopology:true,
 useFindAndModify:false
}).then(()=>{
 console.log("Connected db succesfully")
}).catch((err)=>{
console.log("No connectione")
})