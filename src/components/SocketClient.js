
import React, { useContext, useEffect, useRef } from 'react'
import { io } from 'socket.io-client';
import { ProductContext } from '../contexts/ProductContext';

const SocketClient = ({socketClient}) => {
  const { socketIn, setMessPushNoti } = useContext(ProductContext);
 
  useEffect(() => {
    const fetchNoti = async () => {
      await socketIn(socketClient);
    };
    socketClient?.on("push-noti-new", (mess) => {
      setMessPushNoti(mess)
    })
    socketClient?.on("order", (mess) => {
      console.log("order", mess);
    })

    fetchNoti();
  }, [socketClient]); 
      return(
        <></>
      )
}


export default SocketClient