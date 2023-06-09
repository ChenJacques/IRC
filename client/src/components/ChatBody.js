import React from 'react'
import {useNavigate} from "react-router-dom"

const ChatBody = ({messages, lastMessageRef}) => { 
  const navigate = useNavigate()
  
  const handleLeaveChat = () => {
    localStorage.removeItem("userName")
    navigate("/")
    window.location.reload()
  }
  
  return (
    <>
      <header className='chat__mainHeader'>
          <p>{localStorage.getItem("room")}</p>
          <button className='leaveChat__btn' onClick={handleLeaveChat}>LEAVE CHAT</button>
        </header>


        <div className='message__container'>
          {messages.map(message => (
            message.name === localStorage.getItem("userName") && message.room === localStorage.getItem("room") ? (
              <div className="message__chats" key={message.id}>
            <p className='sender__name'>You</p>
            <div className='message__sender'>
                <p>{message.text}</p>
            </div>
          </div>
            ) : message.name !== localStorage.getItem("userName") && message.room === localStorage.getItem("room") ? (
              <div className="message__chats" key={message.id}>
            <p>{message.name}</p>
            <div className='message__recipient'>
                <p>{message.text}</p>
            </div>
          </div>
            ) : (
              console.log('null')
            )
            ))}
          <div ref={lastMessageRef} />   
        </div>
    </>
  )
}

export default ChatBody