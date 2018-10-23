const mongoose = require('mongoose');

const user = new mongoose.Schema({
    name : String,
    lastname : String,
    email : String,
    password : String,
    
});

module.exports = user;