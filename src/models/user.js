const {Schema, model}=require('mongoose');

const userSchema=new Schema({
 userName:{
  type:String,
  require:true
 },
 password:{
  type:String,
  require:true
 },
 userEmail:{
  type:String,

 }
},{timestamps:true})


const User=new model('User', userSchema)

module.exports=User;