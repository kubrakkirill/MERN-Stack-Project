const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userName :{
        type : String,
        required: true, 
        unique : true,       
    },
    image :{
        type: String,
    },
    email :{
        type : String,
        required : true,
        unique : true,
        lowercase: true,
    },
    firstName :{
        type : String,
    },
    lastName :{
        type : String,
    },
    about :{
        type : String,
    },
    password :{
        type : String,
        required: true,
        minlength : [8, 'minimum is 8 characters'],        
    }
})

module.exports = mongoose.model('user', userSchema);