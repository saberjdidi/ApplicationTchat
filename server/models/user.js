const mongoose = require('mongoose');

const user = new mongoose.Schema({
    name : String,
    lastname : String,
    email : String,
    password : String,
    role : {
        type : String,
        enum : ['admin', 'user'],
        default : 'user'
    }
    
});

module.exports = user;