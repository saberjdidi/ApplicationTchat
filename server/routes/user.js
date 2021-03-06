const router = require('express').Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');

mongoose.connect('mongodb://localhost:27017/AppTchat', {
    useNewUrlParser : true,
    useCreateIndex : true,
});

userSchema = require('../models/user');
userModel = mongoose.model('users', userSchema);

messageSchema = require('../models/message');
messageModel = mongoose.model('message', messageSchema)

router.post('/register', async(req, res) => {
    req.body.password = await bcrypt.hashSync(req.body.password);
    const result = await userModel.create(req.body).then().catch(err => {
        res.send(err)
        return
    });
    req.io.emit('newmessage', result);
    res.send(result)
});

router.post('/login', async(req, res) => {
    const resultLogin = await userModel.findOne({email:req.body.email});
    if(!resultLogin){
        res.send({message : 'user not found'});
    }
    if(!bcrypt.compareSync(req.body.password, resultLogin.password)){
        res.send({message : 'is not password'})
    }
    
    const token = jwt.sign({data:resultLogin}, 'secret_code');
    res.send({message : 'ok', usertoken:token})
});

router.get('/users', async(req, res) => {
    const result = await userModel.find();
    res.send(result);
});
router.delete('/users/:id', async(req, res) => {
    const result = await userModel.remove({_id: req.params.id})
    res.send(result)
});
router.put('/users/:id', async(req, res) => {
    const result = await userModel.update({_id: req.params.id}, {$set : req.body});
    res.send(result)
});

//post message
router.post('/message', async(req, res) => {
    const result = await messageModel.create(req.body);
    req.io.emit('newmessage', result);
    res.send(result);
});
//get message
router.get('/message', async(req, res) => {
    const result = await messageModel.find().populate({path : 'author'})
    res.send(result)
});
//delete message
router.delete('/message/:id', async (req, res) => {
    const result = await messageModel.remove({_id : req.params.id});
    req.io.emit('newmessage', result)
    res.send(result)
});


module.exports = router;