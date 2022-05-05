const mongoose=require('mongoose');
const ObjectId=mongoose.Schema.Types.ObjectId;

const internSchema=new mongoose.Schema({// creating schema for intern model
    name:{
        type:String,
        required:'name is required'
    },
    email:{
        type:String,
        required:'email is required',
        unique:true
    },
    mobile:{
        type:String,
        required:'mobile number is required',
        unique:true,
        
    },
    collegeId:{
        type:ObjectId,
        ref:'College'      
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
},{timestamps:true})   //timestamps is used to add createdAt and updatedAt fields in the schema 

module.exports=mongoose.model('Intern',internSchema) //exporting the schema to use in other files 