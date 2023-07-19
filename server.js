
// Initialise server

// importing express
const express = require('express')  // it is a syntax of importing express 

// Sets up our express -> express allows us to create a server
const app = express();

// making a server using http and express
const server = require('http').Server(app); // here i am importing HTTP protocol and i am link that protocol to express(app) server.

// giving public folder to my express app 
app.use(express.static('public')); // it is for, run my app in crome browser

// importing socket.io and then i linking it with my server
const io = require('socket.io')(server);

io.on('connection', (socket)=>{

    console.log('Connection established',socket.id);

    socket.on('message',(data) => { // user is sending message and giving that message to io.
        io.emit('message',data);  // emitting this message to all other sockets.
    })

    socket.on('disconnect', () => {
        console.log("user left the chat");
    })
})

//this is port on which our server will run
const PORT = 9000;
server.listen(PORT, () => {
   console.log('server is running on PORT $(9000}')
})