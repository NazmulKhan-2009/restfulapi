const {Schema,model} = require('mongoose'); 
// const validator = require('validator');

// const admin=new mongoose.Schema({

// })

const adminSchema=new Schema({
 name:{
  type: String,
  require:true,
  unique: true
 },
 email:{
  type: String,
  require:true,
  unique: true
 },
 phone:{
  type: Number,
  require:true,
  unique: true
 }

})

const admin=new model('admin',adminSchema)

module.exports=admin