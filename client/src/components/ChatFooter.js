import React, {useState, useEffect} from 'react'

const ChatFooter = ({socket}) => {
    const [message, setMessage] = useState("")
    const [rooms, setRooms] = useState([])
    const [users, setUsers] = useState([])

    useEffect(() => {
      socket.on("roomList", data => setRooms(data))
  }, [socket, rooms])

    useEffect(()=> {
      socket.on("newUserResponse", data => setUsers(data))
  }, [socket, users])

    const handleSendMessage = (e) => {
        e.preventDefault()
        if(message.startsWith('/nick')) {
          let newName = message.split(' ')
          newName = newName[1]
          socket.emit("editUser",
            {
            text: newName, 
            name: localStorage.getItem("userName")
            }
          )
          localStorage.setItem("userName", newName)

        } else if (message.startsWith('/list')) {
            let listChoice = message.split(' ')
            listChoice = listChoice[1]
            let array = []
              if (listChoice != null) {
                rooms.map(room => (
                  room.includes(listChoice) ? (
                  array.push(room)
                  ) : (null)
                ))
                let listChan = array.toString().split(' ')
                socket.emit("message",
                {
                  text: `Liste des Room disponible contenant ${listChoice} : ${listChan}`,
                  name: "System", 
                  id: `${socket.id}${Math.random()}`,
                  socketID: socket.id,
                  room : localStorage.getItem("room")
                })
              } else {
                let listChan = rooms.toString().split(' ')
                socket.emit("message",
                {
                  text: `Liste des Room disponible : ${listChan}`,
                  name: "System", 
                  id: `${socket.id}${Math.random()}`,
                  socketID: socket.id,
                  room : localStorage.getItem("room")
                }
                )
              }
        } else if (message.startsWith('/create')) {
          let newChan = message.split(' ')
          newChan = newChan[1]
          socket.emit("createRoom", newChan)

        } else if (message.startsWith('/delete')) {
          let delChan = message.split(' ')
          delChan = delChan[1]
          socket.emit("deleteRoom", delChan)
          
        } else if (message.startsWith('/join')) {
          let joinChan = message.split(' ')
          joinChan = joinChan[1]
            if (rooms.includes(joinChan) === true) {
              socket.emit("editUserRoom",
                {
                  name: localStorage.getItem("userName"), 
                  room : joinChan
                })
              localStorage.setItem("room", joinChan)
            } else {
              console.log("Not Found")
            }
          
        } else if (message.startsWith('/quit')) {
          
        } else if (message.startsWith('/users')) {
          let listUsers = []
          users.map(user => (
            user.room === localStorage.getItem("room") ? (
              listUsers.push(user.userName)
            ) : (
              console.log("Not Working 3")
            )
          ))
          socket.emit("message",
          {
            text: `Liste des utilisateurs présents dans la room : ${listUsers}`,
            name: "System", 
            id: `${socket.id}${Math.random()}`,
            socketID: socket.id,
            room : localStorage.getItem("room")
          })
        } else if (message.startsWith('/msg')) {
          
        } else {
          socket.emit("message",
            {
              text: message, 
              name: localStorage.getItem("userName"), 
              id: `${socket.id}${Math.random()}`,
              socketID: socket.id,
              room : localStorage.getItem("room")
            }
          ) 
        }
    setMessage("")
    }
  return (
    <div className='chat__footer'>
        <form className='form' onSubmit={handleSendMessage}>
          <input 
            type="text" 
            placeholder='Write message' 
            className='message' 
            value={message} 
            onChange={e => setMessage(e.target.value)}
            />
            <button className="sendBtn">SEND</button>
        </form>
     </div>
  )
}

export default ChatFooter