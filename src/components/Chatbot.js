import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';
import ChatboxIcon from '../images/chatbox-icon.svg';
const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const textFieldRef = useRef(null);

  const toggleState = () => {
    console.log("CHATBOTNOR");
    setIsOpen(!isOpen);
  };

  const onSendButton = () => {
    const text1 = textFieldRef.current.value;
    if (text1 === "") {
      return;
    }
  
    const newUserMessage = { name: "User", message: text1 };
    setMessages(prevMessages => [...prevMessages, newUserMessage]);
  
    fetch('http://192.168.1.6:80/predict', {
      method: 'POST',
      body: JSON.stringify({ message: text1 }),
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(response => response.json())
    .then(response => {
      const newSamMessage = { name: "Sam", message: response.answer };
      setMessages(prevMessages => [...prevMessages, newSamMessage]);
      textFieldRef.current.value = '';
    })
    .catch((error) => {
      console.error('Error:', error);
      textFieldRef.current.value = '';
    });
  };
  

  const updateChatText = () => {
    return messages.map((item, index) => {
      const className = item.name === "Sam" ? "messages__item messages__item--visitor" : "messages__item messages__item--operator";
      return (
        <div key={index} className={className}>
          {item.message}
        </div>
      );
    });
  };

  useEffect(() => {
    const chatbox = document.querySelector('.chatbox__messages');
    chatbox.scrollTop = chatbox.scrollHeight;
  }, [messages]);

  return (
    <div className={`container`} style={{backgroundColor: 'green'}}>
      <div className={"chatbox"} >
        <div className={`${isOpen ? 'chatbox--active' : 'chatbox__support'}`}>
          <div className="chatbox__header_2" style={{backgroundColor: '#BFDBFD'}}>
            <div className="chatbox__image--header" ></div>
            <div className="chatbox__content--header" >
              <h4 className="chatbox__heading--header" style={{color: '#333'}} >Hỗ Trợ</h4>
              <p className="chatbox__description--header" style={{color: '#333'}}  >Xin Chào. Hãy để lại câu hỏi cho Shop</p>
            </div>
          </div>
          <div className="chatbox__messages">
            {updateChatText()}
          </div>
          <div className="chatbox__footer_2" style={{backgroundColor: '#BFDBFD'}} >
            <input ref={textFieldRef} type="text" placeholder="Câu hỏi..." />
            <button className="chatbox__send--footer send__button" style={{color: '#333'}}onClick={onSendButton}>Gửi</button>
          </div>
        </div>
        <div className="chatbox__button" >
          <button onClick={toggleState} style={{backgroundColor: '#BFDBFD'}}><img src={ChatboxIcon} alt="Chat" style={{backgroundColor: '#BFDBFD'}} /></button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
