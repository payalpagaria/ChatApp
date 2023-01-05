const chatform=document.getElementById('chat-form');
const chatMessages=document.querySelector('.chat-messages');
//Get username and room from url
const{username,room}=Qs.parse(location.search,{
    ignoreQueryPrefix:true
})
const socket=io()
//join chatroom
socket.emit('joinRoom',{username,room});
//Message from server
socket.on('message',(message)=>{
    console.log(message);
    outputMessage(message);
    //scroll down
    chatMessages.scrollTop=chatMessages.scrollHeight;

})


chatform.addEventListener('submit',(e)=>{
    //when u submit a form it submits to a file we want prevent that
    e.preventDefault();
    //get msg text
    const msg=e.target.elements.msg.value;
    //emitting to server 00
    socket.emit('chatMessage',msg);

    //clear input
    e.target.elements.msg.value='';
    e.target.elements.msg.focus();
})
//output msg to dom
function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    const p = document.createElement('p');
    p.classList.add('meta');
    p.innerText = message.username;
    p.innerHTML += `<span>${message.time}</span>`;
    div.appendChild(p);
    const para = document.createElement('p');
    para.classList.add('text');
    para.innerText = message.text;
    div.appendChild(para);
    document.querySelector('.chat-messages').appendChild(div);
  }