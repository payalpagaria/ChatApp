const chatform=document.getElementById('chat-form');
const socket=io()

socket.on('message',(message)=>{
    console.log(message);
})

chatform.addEventListener('submit',(e)=>{
    //when u submit a form it submits to a file we want prevent that
    e.preventDefault();
    //get msg text
    const msg=e.target.elements.msg.value;
    //emitting to server 00
    socket.emit('chatMessage',msg);
})