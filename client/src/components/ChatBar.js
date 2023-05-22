import React, {useState, useEffect} from 'react'

const ChatBar = ({socket}) => {
    const [users, setUsers] = useState([])
    const [rooms, setRooms] = useState([])

    useEffect(()=> {
        socket.on("newUserResponse", data => setUsers(data))
    }, [socket, users])

    useEffect(() => {
        socket.on("roomList", data => setRooms(data))
    }, [socket, rooms])

  return (
    <div className='chat__sidebar'>
        <h2>IRC</h2>
        <div>
            <h4  className='chat__header'>ROOM LIST</h4>
            <div className='chat__users'>
                {rooms.map(room => <p>{room}</p>)}
            </div>
            <h4  className='chat__header'>ACTIVE USERS</h4>
            <div className='chat__users'>
                {users.map(user => (
                    user.room === localStorage.getItem("room") ? (
                        <p>{user.userName}</p>
                    ) : (null)
                    ))
                }
            </div>
        </div>
  </div>
  )
}

export default ChatBar