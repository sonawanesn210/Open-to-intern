const collegeModel = require('../Models/collegeModel')
const internModel = require('../Models/internModel')
let validString = /\d/

// const jwt=require("jsonwebtoken")



const createColleges= async  (req, res) =>{
    try {
        let data = req.body
    
        if(Object.keys(data).length === 0)  return res.status(400).send({status:false,message:"Invalid request parameters please provide College details"})
    
        if(!data.name)
            return res.status(400).send({status:false,message:" Name is required"})

        if(!data.fullName)
            return res.status(400).send({status:false,message:"Full name is required"})

        if(!data.logoLink)
            return res.status(400).send({status:false,message:"logoLink is required"})
        
        if(validString.test(data.name))
            return res.status(400).send({status:false,message:'Name should not contain number '})
        
        if(validString.test(data.fullName))
            return res.status(400).send({status:false,message:'Fullname should not contain number '})
        
      const result=await collegeModel.create(data)
        res.status(201).send({status:true,message:"created successfully",data:result})
    }
    catch (err) {
        
        res.status(500).send({ status:false, data: err.message })
    }

}

  const collegeDetails=async (req,res)=>{
    try{
    let data=req.query.collegeName
   
    if(!data) return res.status(400).send({status:false, msg:"Enter the name of college"})

    let getCollegeName=await collegeModel.findOne({name:data,isDeleted:false}).select({name:1,fullName:1,logoLink:1})
    if(!getCollegeName) return res.status(404).send({status:false, msg:"No such college found"})
    let details=getCollegeName._doc
    let inernDetails=await internModel.find({collegeId:details._id, isDeleted: false}).select({name:1, email:1, mobile:1})
    if(!inernDetails) return res.status(404).send({status:false, msg:"No such intern found"})
    delete(details._id);
    details.interests = inernDetails;
    res.status(200).send({status:true, data:details})
}
catch(err){
    res.status(500).send({ status: false, msg: err.message });
}
}  
 

module.exports.createColleges = createColleges
module.exports.collegeDetails=collegeDetails