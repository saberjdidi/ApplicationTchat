const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const port = 3000;
//use for socket
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', function(socket){
  console.log('user connect');

  socket.on('join', function(data){
    //joining
    socket.join(data.city);
    console.log(data.username+ 'joined the city :' + data.city);
    socket.broadcast.to(data.city).emit('new username joined', {username:data.username, message:'has joined this city.'});
  });
});

app.use((req, res, next) => {
  req.io = io
  next()
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS"); 
  next();
});

app.use(bodyparser.json());


const user = require('./server/routes/user');
app.use('/user', user);

//const chat = require('./server/routes/chat');
//app.use('/chat', chat);

http.listen(port, err => {
  console.log(`connect with port${port}`)  
});