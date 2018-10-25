const mongoose = require('mongoose');

const message = new mongoose.Schema({
   
    message : String,
    city : String,
    username : String,
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
    
});

module.exports = message;