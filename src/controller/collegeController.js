const collegeModel = require('../Models/collegeModel')
const internModel = require('../Models/internModel')
let validString = /\d/  //validating the string for numbers
let validUrl = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
const createColleges= async  (req, res) =>{
    try {
        let data = req.body
        //validating the data for empty values
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

         if(!validUrl.test(data.logoLink))
            return res.status(400).send({status:false,message:'Enter Valid Url'})  
        
        
      const result=await collegeModel.create(data)
        res.status(201).send({status:true,message:"created successfully",data:result})
    }
    catch (err) {
        
        res.status(500).send({ status:false, data: err.message })
    }

}
/* 
  const collegeDetails=async (req,res)=>{
    try{
    let data=req.query.collegeName
   
    if(!data) return res.status(400).send({status:false, msg:"Enter the name of college"})

    let getCollegeDetails=await collegeModel.findOne({name:data,isDeleted:false}).select({name:1,fullName:1,logoLink:1})
    if(!getCollegeDetails) return res.status(404).send({status:false, msg:"No such college found"})
    let details=getCollegeDetails._doc
   // console.log(details)
    let inernDetails=await internModel.find({collegeId:details._id, isDeleted: false}).select({name:1, email:1, mobile:1})
    if(!inernDetails) return res.status(404).send({status:false, msg:"No such intern found"})
    //console.log(inernDetails)
    delete(details._id);
    details["interests"] = inernDetails;
    res.status(200).send({status:true, data:details})
}
catch(err){
    res.status(500).send({ status: false, msg: err.message });
}
}   
  */
const collegeDetails = async function(req,res){
    try{
       
    let data = req.query.collegeName
    if(!data)  return res.status(400).send({status : false, msg : "Enter the name of college" })

    let getCollege = await collegeModel.findOne({name:data, isDeleted : false}).select({name:1,fullName:1,logoLink:1})
    if(! getCollege){
        return res.status(404).send({status : false, msg : "No such college found"})
    }
    
    const internList = await internModel.find({collegeId :getCollege._id ,isDeleted : false}).select({_id :1,name : 1,email:1,mobile : 1});
    if(internList.length != 0){
        let Data = {
            name :getCollege.name,
            fullName : getCollege.fullName,
            logoLink : getCollege.logoLink,
            interests : internList
        }
        return res.status(200).send({status : true, data : Data});
    }
    
}
  catch(err){
    console.log(err)
    res.status(500).send({status : false, msg:"error", err : err.message})
    }


}

module.exports.createColleges = createColleges
module.exports.collegeDetails=collegeDetails