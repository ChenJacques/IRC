const express = require("express")
const app = express()
const cors = require("cors")
const http = require('http').Server(app);
const PORT = 4000
const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000"
    }
});

app.use(cors())
let users = []
let servers = []

// Connexion
socketIO.on('connection', (socket) => {
    console.log(`: ${socket.id} user just connected!`) 
    
    // Join room 
    socket.on("join_room", (roomId) => {
      socket.join(roomId);
      console.log(`User joined room : ${roomId}`)
      if (servers.includes(`${roomId}`)) {
        socketIO.emit("roomList", servers)
      } else {
        servers.push(roomId)
        socketIO.emit("roomList", servers)
        }
    })

    // Leave room
    socket.on("leave_room", (roomId) => {
      socket.leave(roomId);
      console.log(`User left room : ${roomId}`)
    })

    // Send Message
    socket.on("message", data => {
      socketIO.emit("messageResponse", data)
    })

    // Receive Message
    socket.on("typing", data => (
      socket.broadcast.emit("typingResponse", data)
    ))

    // Add User
    socket.on("newUser", data => {
      users.push(data)
      socketIO.emit("newUserResponse", users)
    })
    
    // Edit User Name
    socket.on("editUser", data => {
      users.map(user => (
        user.userName === data.name ? (
          user.userName = data.text
        ) : (
          console.log("Not working 1")
        )
      ))
      socketIO.emit("newUserResponse", users)
    })

    // Edit User Room
    socket.on("editUserRoom", data => {
      users.map(user => (
        user.userName === data.name ? (
          user.room = data.room
        ) : (
          console.log("not working 2")
        )
      ))
      console.log(users)
      socketIO.emit("newUserResponse", users)
    })

    // Create Room
    socket.on("createRoom", data => {
      if (servers.includes(data)) {
        socketIO.emit("roomList", servers)
      } else {
        servers.push(data)
        socketIO.emit("roomList", servers)
        }
    })

    // Delete Room
    socket.on("deleteRoom", data => {
      if (servers.includes(data) === true) {
        var filteredArray = servers.filter(e => e !== data);
        console.log(filteredArray)
        servers = filteredArray
        socketIO.emit("roomList", servers)
      } else {
        console.log("Not Found")
        }
    })
    
    // Disconnect
    socket.on('disconnect', () => {
      console.log(`: A user disconnected`);
      users = users.filter(user => user.socketID !== socket.id)
      socketIO.emit("newUserResponse", users)
      socket.disconnect()
    });
});

http.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});