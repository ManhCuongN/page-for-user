import React, { useEffect, useState, useContext } from 'react';
import { io } from 'socket.io-client';
import { Link } from "react-router-dom";
import user from "../images/user.svg";
import { Button, Popover } from 'antd';
import { AuthContext } from "../contexts/AuthContext";
import { ProductContext } from '../contexts/ProductContext';
import { BellOutlined } from '@ant-design/icons';
const text = <span>Notifications</span>;

function Noti() {
 // const [socket, setSocket] = useState(null);
  const [listNoti, setListNoti] = useState([]);
  const {productState: {socket}, messPushNotiNew} = useContext(ProductContext)
  const [message, setMess] = useState(messPushNotiNew);

  const userId = JSON.parse(localStorage.getItem('userId'));
  const { getNotiByUser } = useContext(AuthContext);
  
  //socket
  socket?.on("noti-order-success", (mess) => {
    if(mess.userId === localStorage.getItem('userId')) {
      setMess(`The ${mess.trackingNumber} order was placed successfully`)
      //console.log("nghe e noti", `The ${mess.trackingNumber} order was placed successfully`);
    }
  })
  
socket?.on("pushNotiDiscount", (mess) => {
    console.log("messs", mess);
    const us = localStorage.getItem('userId')
    if(us.includes(mess?.listFollower)) {
      setMess(mess.text)
    }
    
  })
 
  
  

  useEffect(() => {
    
  
    // Lấy danh sách thông báo khi component được mount
    const fetchNoti = async () => {
      if (userId) {
        const re = await getNotiByUser(userId);
        setListNoti(re?.metadata || []);
      }
    };

    fetchNoti();
  }, [userId]); // Thêm userId vào dependency array để useEffect chỉ chạy khi userId thay đổi

  const content = (
    <div style={{ maxWidth: "300px" }}>
      <p style={{color: "red"}}>{message}</p>
      {listNoti.map((noti) => (
        <div key={noti._id}>
          <p>
            <b>{noti.noti_content}</b>
          </p>
        </div>
      ))}
    </div>
  );

  return (
    <div>
      <Link to="" className="d-flex align-items-center gap-10 text-white">
        <Popover placement="bottom" title={text} content={content} style={{display: 'block'}}>
        <BellOutlined style={{fontSize: "35px"}}/>

          {message}
        </Popover>
      </Link>
    </div>
  );
}

export default Noti;
