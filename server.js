const path=require('path')
const express=require('express')
const socketio=require('socket.io')
const http=require('http')
const app=express()
const server=http.createServer(app);
const io=socketio(server);
app.use(express.static(path.join(__dirname,'public')))
// run when client connects
io.on('connection', (socket) => {
    console.log('someone connected!');
    socket.emit('message',' Welcome to the chat');
    socket.broadcast.emit("hello", "world");

});

const PORT=3000 || process.env.PORT;

server.listen(PORT,()=>{
    console.log(`The server is running on port ${PORT}`);
})
