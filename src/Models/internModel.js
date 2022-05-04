const mongoose=require('mongoose');
const ObjectId=mongoose.Schema.Types.ObjectId;
// const validateEmail = require('email-validator');
const internSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
        minlength:10,
        maxlength:10
    },
    collegeId:{
        type:ObjectId,
        ref:'College'      
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

module.exports=mongoose.model('Intern',internSchema)