import React, { useState, useRef, useEffect } from 'react';
import styles from './chatAI.module.css';  
import ChatboxIcon from '../images/chatbox-icon.svg';
const ChatBoxAI = () => {
  const [isOpen2, setIsOpen2] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isWaiting, setIsWaiting] = useState(false); // Thêm trạng thái isWaiting
  const textFieldRef = useRef(null);

  const toggleState2 = () => {
    setIsOpen2(!isOpen2);
  };

  const onSendButton = () => {
    
    const text1 = textFieldRef.current.value;
    if (text1 === "") {
      return;
    }

    const newUserMessage = { name: "User", message: text1 };
    setMessages(prevMessages => [...prevMessages, newUserMessage]);
    setIsWaiting(true); // Bắt đầu chờ câu trả lời

    fetch('https://chat-createimg.onrender.com/api/v1/dalle/chat', {
      method: 'POST',
      body: JSON.stringify({ prompt: text1 }),
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(response => response.json())
    .then(response => {
      const newSamMessage = { name: "Sam", message: response.message };
      setMessages(prevMessages => [...prevMessages, newSamMessage]);
      textFieldRef.current.value = '';
    })
    .catch((error) => {
      console.error('Error:', error);
      textFieldRef.current.value = '';
    })
    .finally(() => {
      setIsWaiting(false); // Kết thúc chờ câu trả lời
    });
  };

  const updateChatText = () => {
    return messages.map((item, index) => {
      const className = item.name === "Sam" ? `${styles.messages_item} ${styles.messages_item_visitor}` : `${styles.messages_item} ${styles.messages_item_operator}`;

      return (
        <div key={index} className={className}>
          {item.message}
        </div>
      );
    });
  };

  return (
    <div className={`container`}>
      <div className={`${styles.chatbox_hi}`}>
        <div className={`${isOpen2 ? styles.chatbox_active : styles.chatbox_support}`}>
          <div className={`${styles.chatbox_header}`}>
            <div className={`${styles.chatbox_image_header}`}></div>
            <div className={`${styles.chatbox_content_header}`}>
              <h4 className={`${styles.chatbox_heading_header}`}>HỎI ĐÁP VỚI AI</h4>
              <p className={`${styles.chatbox_description_header}`}>Xin chào. AI sẽ giúp bạn</p>
            </div>
          </div>
          <div className={`${styles.chatbox_messages}`} style={{height: '250px'}}> 
            {updateChatText()}
            {isWaiting && <div className={styles.loading_indicator}>⏳</div>}
          </div>
          <div className={`${styles.chatbox_footer}`}>
            <input ref={textFieldRef} type="text" placeholder="Câu hỏi..." />
            <button className={`${styles.chatbox_send_footer} ${styles.send_button}`} onClick={onSendButton}>Gửi</button>
          </div>
        </div>
        <div className={`${styles.chatbox_button}`}>
          <button onClick={toggleState2}><img src={ChatboxIcon} alt="Chat" /></button>
        </div>
      </div>
    </div>
  );
};

export default ChatBoxAI;
