const mongoose = require('mongoose')

const collegeSchema = new mongoose.Schema({ // creating schema for college model 
    name: {
        type: String,//type of data in the field should be string
        required: 'name is required',//required fields
        unique: true   //name is unique field
    },
    fullName: {
        type: String,
        required: 'College Full name is required'
    },
    logoLink: {
        type: String,
        require: 'logoLink is required'
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });//timestamps is used to add createdAt and updatedAt fields in the schema 

module.exports = mongoose.model('College', collegeSchema) //exporting the schema to use in other files 