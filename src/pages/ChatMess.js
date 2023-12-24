import React, { useContext, useEffect,useRef, useState } from "react";
import "./ChatMess.css"
import { AuthContext } from "../contexts/AuthContext";
import Conversation from "../components/conversation/Conversation";
import ChatShop from "../components/chatShop/ChatShop";
import config from "../config";
import {io} from "socket.io-client"
const ChatMess = () => {

    const {authState: {user}, userChats} = useContext(AuthContext)
    const [chats, setChats] = useState([])
    const [onlineUsers, setOnlineUsers] = useState([])
    const [sendMessage, setSendMessage] = useState(null)
    const [receiveMessage, setReceiveMessage] = useState(null)



    const [currentChat, setCurrentChat] = useState(null)
    const socket = useRef()


   


    useEffect(() => {
          socket.current = io(config.urlSocket);
          socket.current.emit("new-user-add", user.idUser)
          socket.current.on("get-user", (users) => {
            setOnlineUsers(users)
          })
    }, [user])

  
 

    useEffect(() => {
        const getChats = async() => {
            try {
                const data = await userChats(user.idUser)
                setChats(data)
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        }
        getChats()
    }, [user])
       //send mess to socker server
       useEffect(() => {
        if(sendMessage !== null) {
            console.log("gui di", sendMessage);
         socket.current.emit('send-message', sendMessage)
        }
     }, [sendMessage])
         //recie mess to socker server
         useEffect(() => {
            socket.current.on("receive-message", (data) => {
                console.log("data received in parent chat.jsx", data);
                setReceiveMessage(data)
            })
         }, [])
    return (
        <div className="Chat">
            {/* left side */}
            <div className="Left-side-chat">
                <div className="Chat-container">
                <h2>Trò Chuyện</h2>
                <div className="Chat-list">
                   {chats.map((chat) => (
                    <div onClick={() => setCurrentChat(chat)}>
                        <Conversation data={chat} currentUserId={user.idUser} />
                    </div>
                   ))}
                </div>
                </div>
                
            </div>


            {/* right side */}
            <div className="Right-side-chat">
                <div style={{width: '20rem', alignSelf: "flex-end"}}>
                </div>
                <ChatShop chat={currentChat} currentUser = {user.idUser}
                setSendMessage = {setSendMessage}
                receiveMessage={receiveMessage}/>
            </div>
        </div>
    )
}

export default ChatMess