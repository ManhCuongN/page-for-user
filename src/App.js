import React, { useContext, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import OurStore from "./pages/OurStore";
import Blog from "./pages/Blog";
import CompareProduct from "./pages/CompareProduct";
import Wishlist from "./pages/Wishlist";
import Login from "./pages/Login";
import Forgotpassword from "./pages/Forgotpassword";
import Signup from "./pages/Signup";
import Resetpassword from "./pages/Resetpassword";
import SingleBlog from "./pages/SingleBlog";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RefundPloicy from "./pages/RefundPloicy";
import ShippingPolicy from "./pages/ShippingPolicy";
import TermAndContions from "./pages/TermAndContions";
import SingleProduct from "./pages/SingleProduct";
import Profile from "./pages/Profile"
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import ProtectedRoute from "./routing/PrivateRoute";
import  AuthContextProvider, { AuthContext }  from "./contexts/AuthContext";
import AddressContextProvider from "./contexts/AddressContext";
import ProductContextProvider, { ProductContext } from "./contexts/ProductContext";
import CommentContextProvider from "./contexts/CommentContext";

import CartContextProvider from "./contexts/CartContext";
import ShopInfo from "./pages/ShopInfo";
// import ShopInfo from "./pages/profile";
import SocketClient from "./components/SocketClient"
import  { useEffect, useRef } from 'react'
import { io } from 'socket.io-client';
import PurchaseSuccess from "./pages/PurchaseSuccess";
import ListOrdered from "./pages/ListOrdered";
import FaceIO from "./pages/FaceIO";
import ChatMess from "./pages/ChatMess";
import config from "./config";
import LayoutT from "./components/LayoutT";
import SignUpShop from "./pages/SignUpShop";

function App() {
  const [socketClient, setClient] = useState(null)
  useEffect(() => {
    const initSocket = () => {
         
      const newSocket = io(config.urlSocket);
      // setSocket(newSocket);
     setClient(newSocket)
  
      newSocket?.on('connect', () => {
        console.log('Connected to server');
      });
      newSocket?.on('pushNotiDiscount', (mee) => {
        console.log('Connected to serverad', mee);
      });
      // newSocket.on('push-noti-new', (mess) => {
      //   console.log('Appp', mess);
      // });
      // newSocket.emit('order', "helo");
    
  };
  // Khởi tạo kết nối Socket.IO khi component được mount hoặc userId thay đổi
  initSocket();
  },[])
  return (
    <>

    <AuthContextProvider>

      <ProductContextProvider>
     {1==1 && <SocketClient socketClient={socketClient}/>}

      <AddressContextProvider>
       <CartContextProvider>
        <CommentContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoute />}>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="product" element={<OurStore />} />
              <Route path="product/:id" element={<SingleProduct />} />
              <Route path="shop-info/:id" element={<ShopInfo />} />
              <Route path="blogs" element={<Blog />} />
              <Route path="blog/:id" element={<SingleBlog />} />
              <Route path="cart" element={<Cart />} />
              <Route path="checkout" element={<Checkout socketClient={socketClient} />} />
              <Route path="profile" element={<Profile/>} />
              <Route path="compare-product" element={<CompareProduct />} />
              <Route path="wishlist" element={<Wishlist />} />
              <Route path="forgot-password" element={<Forgotpassword />} />
              <Route path="reset-password" element={<Resetpassword />} />
              <Route path="privacy-policy" element={<PrivacyPolicy />} />
              <Route path="refund-policy" element={<RefundPloicy />} />
              <Route path="shipping-policy" element={<ShippingPolicy />} />
              <Route path="term-conditions" element={<TermAndContions />} />
              <Route path="pucharse-success" element={<PurchaseSuccess />} />
              <Route path="list-ordered" element={<ListOrdered />} />
              <Route path="chat" element={<ChatMess />} />



            </Route>
          </Route>
        </Routes>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="sign-up-shop" element={<SignUpShop />} />

            <Route path="face-io" element={<FaceIO />} />

          </Route>
        </Routes>
      </BrowserRouter>
      </CommentContextProvider>
      </CartContextProvider>
      </AddressContextProvider>
      </ProductContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
