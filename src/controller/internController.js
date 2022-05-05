const internModel=require("../Models/internModel")
const validateEmail = require('email-validator')
const mongoose = require('mongoose');
const collegeModel = require("../Models/collegeModel");

let validMobile=/^[6-9]\d{9}$/  //validating the mobile number (starting from 6 also considerd)
let validString = /\d/  //validating the string for numbers
//const isValidObjectId = (ObjectId) => {return mongoose.Types.ObjectId.isValid(ObjectId)} //validating the collegeId is match or not from mongoose 


const createIntern=async (req,res)=>{
    try{
    let data =req.body
    // check body empty or not
    if (Object.keys(data).length == 0) return res.status(400).send({ status: false, msg: "Data is required to add a Intern" });
        // check validation for the required field name,email,mobile,collegeId   
     if(!data.name)
     return res.status(400).send({ status: false, msg: "Name is required" }); 
     if(!data.email) 
     return res.status(400).send({ status: false, msg: "Email is required" });
    if(!data.mobile)
    return res.status(400).send({ status: false, msg: "Mobile No. is required" }); 
    if(!data.collegeName)
    return res.status(400).send({ status: false, msg: "CollegeName is required" });

    if(validString.test(data.name))//validation for the string
    return res.status(400).send({status:false, msg:"Name should not contain numbers"});     
    /* if(!isValidObjectId(data.collegeId))//check whether the given string is valid object id or not
    return res.status(400).send({status:false, msg:"Enter a valid collegeId"}) */
    // getting the college data from the database by using collegeId
    /* let collegeData = await collegeModel.findById(data.collegeId)
    if(!collegeData) return res.status(400).send({status:false, msg:"Enter a valid collegeId"}) 
    */

    
    if(!validateEmail.validate(data.email))// check for the email is valid or not by using email validator package
     return res.status(400).send({ status: false, msg: "Enter a valid email" });
    
    let uniqueEmail = await internModel.findOne({ email: data.email });// check email value present in collection or not
    if(uniqueEmail) return res.status(400).send({ status: false, msg: "Email already exist" });
    
    if(!validMobile.test(data.mobile))// check in mobile field validation
     return res.status(400).send({status:false, msg:"Enter a valid mobile number"});
    let uniqueMobile=await internModel.findOne({mobile:data.mobile});// check for the mobile no already exist or not 
    if(uniqueMobile) return res.status(400).send({status:false, msg:"Mobile Number already exist"})


    let collegeData = await collegeModel.findOne({ name:data.collegeName })
    if (!collegeData) {
        return res.status(404).send({ status: false, msg: "collegeName invalid" })
    }

    data["collegeId"]=collegeData._id
     delete data.collegeName
    
    const result = await internModel.create(data)
     res.status(201).send({status:true,data:result})  //create document in Intern collection
   
    }
    catch(err){
        res.status(500).send({ status: false, msg: err.message });
    }
}

module.exports.createIntern=createIntern