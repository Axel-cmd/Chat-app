const io = require('socket.io')(4200, {
    cors: {
        origin: 'http://localhost:3000'
    }
})


let users = [];

const addUser = (userId, socketId) => {
    if(!users.some((usr) => usr.userId === userId )){
        users.push({userId, socketId})
    }
}

const removeUser = (socketId) => {
    users= users.filter(user => user.socketId !== socketId)
}

const getUser = (userId) => {
    return users.find(usr => usr.userId === userId)
}

io.on('connection', (socket) => {
    // connect 
    console.log('user connected');
    // récupérer l'id de l'utilisateur et l'id de la socket  
    socket.on("addUser", userId => {
        addUser(userId, socket.id);
    })

    // envoyé et recevoir des messages
    socket.on("sendMessage", ({senderId, receiverId, text}) => {
        const user = getUser(receiverId);
        io.to(user.socketId).emit("getMessage", {
            senderId,
            text
        })
    })

    socket.on("startConversation", ({senderId, receiverId, conversationId}) => {
        const user = getUser(receiverId);
        io.to(user.socketId).emit('getConversation', {
            senderId,
            conversationId
        })
    })

    //  disconnect
    socket.on("disconnect", () => {
        console.log('use disconnected');
        removeUser(socket.id)
    })
})