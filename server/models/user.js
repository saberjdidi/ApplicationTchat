const mongoose = require('mongoose');

const user = new mongoose.Schema({
    name : String,
    lastname : String,
   // message : String,
    //city : String,
    email : String,
    password : String,
    
});

module.exports = user;