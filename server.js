const path=require('path')
const express=require('express')
const socketio=require('socket.io')
const http=require('http')
const formatMessage = require("./utils/messages");
const {userJoin,getCurrentuser}=require("./utils/users");
const app=express()
const server=http.createServer(app);
const io=socketio(server);
app.use(express.static(path.join(__dirname,'public')))
// run when client connects
const botname='Chat bot'
io.on('connection', (socket) => {
    socket.on('joinRoom',({username,room})=>{
       const user=userJoin(socket.id,username,room);
       socket.join(user.room);
        socket.emit('message',formatMessage(botname,' Welcome to the chat'));
        //broadcast when a user connects
        socket.broadcast.to(user.room).emit('message', formatMessage(botname,`${user.username} has entered`));
    
    })
    // Runs when client disconnects
    
    //listen for chat msg came from frontend 00
    socket.on('chatMessage',(msg)=>{
        io.emit('message',msg);
    })
    socket.on('disconnect',()=>{
        io.emit('message','user has left the chat')
    });
});


const PORT=3000 || process.env.PORT;

server.listen(PORT,()=>{
    console.log(`The server is running on port ${PORT}`);
})
