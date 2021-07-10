const {Schema,model}=require('mongoose')

const courseSchema=new Schema({

courseName:{
 type:String,
 required:true,
 unique:true
},

language:{
 type:String,
 required:true,
},

fee:{
 type:Number,
},

running:{
 type:String,
 enum:['active','inactive']
},

date:{
 type:Date,
 default:Date.now
}

})

// console.log(courseSchema.methods)

//! instance Methods

courseSchema.methods={
 findActive:function(clue){
  return model("Courseoffer").find(clue)
 },
 addCourse:function(clue){
  return model("Courseoffer").create(clue)
 }
}

//!static methods

courseSchema.statics={
findBySome:function(clue){
 // return this.find({language:/scr/i})
 return this.find({courseName:new RegExp(clue,"i")})
}
}

//! query helper

courseSchema.query={
 byFee:function(clue){
return this.find({fee:clue})
 }
}
// console.log(courseSchema)

const course=new model('Courseoffer',courseSchema)
// console.log(course)

module.exports = course
// module.exports = courseSchema