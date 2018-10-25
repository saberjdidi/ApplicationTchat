const router = require('express').Router();
const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/AppTchat', {
    useNewUrlParser : true,
    useCreateIndex : true,
});

chatSchema = require('../models/chat');
chatModel = mongoose.model('chat', chatSchema);

router.post('/chat', async(req, res) => {
    const result = await chatModel.create(req.body)
    req.io.emit('newarticle', result);
    res.send(result)
});

router.get('/chat', async(req, res) => {
    const result = await chatModel.find();
    res.send(result);
});

module.exports = router;