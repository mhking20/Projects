const socket = io('http://localhost:8800');


const namee = prompt("Enter Your Name");
socket.emit('new_user' , namee);

const container = document.querySelector('.container');
const form = document.querySelector('.send_container');
const input = document.querySelector('.input');

const append = (message , position) => {
    const element = document.createElement('div');
    element.innerText = message;
    element.classList.add('message');
    element.classList.add(position);
    container.append(element);
}

socket.on('user_joined' , name =>{
    append( ` ${name} Joined the chat ` , 'right')
})

form.addEventListener('submit' , (e) => {
    e.preventDefault();
    const value = input.value;
    append( ` You : ${value} ` , 'right' )
    socket.emit('message' , value )
    input.value = "";
})

socket.on('message' , message => {
  append( ` ${message.name} : ${message.message} ` , 'left' )
})

socket.on('dell' , dell => {
  append( ` ${dell}  left the chatt ` ,  'right' )
})