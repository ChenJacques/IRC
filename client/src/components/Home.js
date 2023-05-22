import React, {useState} from 'react'
import {useNavigate} from "react-router-dom"

const Home = ({socket}) => {
    const navigate = useNavigate()
    const [userName, setUserName] = useState("")
    const [room, setRoom] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault()
        localStorage.setItem("userName", userName)
        socket.emit("newUser", {userName:userName, socketID: socket.id, room:room})
        localStorage.setItem("room", room)
        socket.emit("join_room", room);
        navigate("/chat")
    }
  return (
    <div class="area" >
            <ul class="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
        <form className='home__container' onSubmit={handleSubmit}>
        <h2 className='home__header'>Sign in to IRC</h2>
        <label htmlFor="username">Username</label>
        <input type="text" 
        minLength={4} 
        name="username" 
        id='username'
        className='username__input' 
        value={userName} 
        onChange={e => setUserName(e.target.value)}
        placeholder="Enter username ..."
        />
        <label htmlFor="room">Room</label>
        <input type="text" 
        minLength={4} 
        name="room" 
        id='room'
        className='username__input' 
        value={room} 
        onChange={e => setRoom(e.target.value)}
        placeholder="Create/Join a room ..."
        />
        <button className='home__cta'>SIGN IN</button>
    </form>
        </ul>
    </div >
  )
}

export default Home