const io = require('socket.io')(8800 , {cors : { origin: '*'}});

const users = {};

io.on('connect' , socket => {
    socket.on('new_user' , name =>{
        users[socket.id] = name;
        socket.broadcast.emit('user_joined' , name)
    })

    socket.on('message' , message => {
        socket.broadcast.emit ('message' , {message:message , name:users[socket.id]})
    })

    socket.on('disconnect' , dell => {
        socket.broadcast.emit('dell' , users[socket.id] )
        delete users[socket.id]
    })
})

