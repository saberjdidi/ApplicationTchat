const mongoose = require('mongoose');

const chat = new mongoose.Schema({
    username: String,
    city: String
    
});

module.exports = chat;