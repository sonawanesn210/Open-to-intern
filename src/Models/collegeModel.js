const mongoose = require('mongoose')

const collegeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'name is required',
        unique: true
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
}, { timestamps: true });

module.exports = mongoose.model('College', collegeSchema)