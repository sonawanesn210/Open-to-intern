const express = require('express');
const {createColleges} =require('../controller/collegeController')
const {createIntern}=require("../controller/internController")
const {collegeDetails} = require('../controller/collegeController')
const router = express.Router();



router.post("/functionUp/Colleges",createColleges)

router.post('/functionup/interns',createIntern)
router.get('/functionup/collegeDetails',collegeDetails)

module.exports = router;