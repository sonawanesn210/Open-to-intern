const internModel=require("../Models/internModel")
const validateEmail = require('email-validator')
const mongoose = require('mongoose');
const collegeModel = require("../Models/collegeModel");

//let validMobile=/^(?:(?:\+|0{0,2})91(\s*|[\-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/  (//for indian local mobile number validation and for Indian international )
//let validMobile= /^[789]\d{9}$/    //validating the mobile number (starting from 6 not considerd)
let validMobile=/^[6-9]\d{9}$/  //validating the mobile number (starting from 6 also considerd)
let validString = /\d/  //validating the string for numbers
//Below function is to check whether the given string is a valid ObjectId or not
const isValidObjectId = (ObjectId) => {return mongoose.Types.ObjectId.isValid(ObjectId)};
const createIntern=async (req,res)=>{
    try{
    let data =req.body
    if (Object.keys(data).length == 0) return res.status(400).send({ status: false, msg: "Data is required to add a Intern" });

    if(!data.name) return res.status(400).send({ status: false, msg: "Name is required" });
    if(!data.email) return res.status(400).send({ status: false, msg: "Email is required" });
    if(!data.mobile) return res.status(400).send({ status: false, msg: "Mobile No. is required" });
    if(!data.collegeId) return res.status(400).send({ status: false, msg: "CollegeId is required" });
    if(validString.test(data.name)) return res.status(400).send({status:false, msg:"Name should not contain numbers"}); 
    if(!isValidObjectId(data.collegeId)) return res.status(400).send({status:false, msg:"Enter a valid collegeId"})
    let collegeData = await collegeModel.findById(data.collegeId)
    if(!collegeData) return res.status(400).send({status:false, msg:"Enter a valid collegeId"})
    if(!validateEmail.validate(data.email)) return res.status(400).send({ status: false, msg: "Enter a valid email" });
    let uniqueEmail = await internModel.findOne({ email: data.email });
    if(uniqueEmail) return res.status(400).send({ status: false, msg: "Email already exist" });
    if(!validMobile.test(data.mobile)) return res.status(400).send({status:false, msg:"Enter a valid mobile number"});
    if(!validString.test(data.mobile)) return res.status(400).send({status:false, msg:"Number should be a digit"});
    let uniqueMobile=await internModel.findOne({mobile:data.mobile});
    if(uniqueMobile) return res.status(400).send({status:false, msg:"Mobile Number already exist"})
    
    const result = await internModel.create(data)
     res.status(201).send({status:true,data:result})
    }
    catch(err){
        res.status(500).send({ status: false, msg: err.message });
    }
}

module.exports.createIntern=createIntern