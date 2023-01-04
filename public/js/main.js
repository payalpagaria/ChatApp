const chatform=document.getElementById('chat-form');
const chatMessages=document.querySelector('.chat-messages');
const socket=io()
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
function outputMessage(message){
    const div=document.createElement('div');
    div.classList.add('message');
    div.innerHTML=`<p class="meta">Brad <span>9:12pm</span></p>
    <p class="text">
        ${message}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div);

}