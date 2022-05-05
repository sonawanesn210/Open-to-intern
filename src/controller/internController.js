const internModel=require("../Models/internModel")
const validateEmail = require('email-validator')
const mongoose = require('mongoose');
const collegeModel = require("../Models/collegeModel");
const isValidObjectId = (ObjectId) => {return mongoose.Types.ObjectId.isValid(ObjectId)};

let validString = /\d/


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
    if(data.mobile.length !==10) return res.status(400).send({status:false, msg:"Enter a valid mobile number"});
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