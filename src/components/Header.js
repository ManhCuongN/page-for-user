import React, { useContext, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import compare from "../images/compare.svg";
import { FaMicrophone } from "react-icons/fa";
import wishlist from "../images/wishlist.svg";
import user from "../images/user.svg";
import cart from "../images/cart.svg";
import menu from "../images/menu.svg";
import axios from "axios";
import Noti from "./Noti";
import { CartContext } from "../contexts/CartContext";
import { Avatar, List } from 'antd';
import { ProductContext } from "../contexts/ProductContext";
import './Header.css'; // Import file CSS chứa các style
import { AuthContext } from "../contexts/AuthContext";
import { HeartOutlined, MessageOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
const Header = () => {
  const { authState: { user } } = useContext(AuthContext)
  const navigate = useNavigate();
  const [voice, setVoice] = useState("")

  const { cartState: { listProductCart } } = useContext(CartContext)
  const { searchProductFunc, productState: { searchProduct } } = useContext(ProductContext)
  const [numCart, setNumCart] = useState(listProductCart?.cart_products?.length || 0)
  const [showList, setShowList] = useState(false);

  const initializeSpeechRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;

    const grammar = '#JSGF V1.0;';
    const recognition = new SpeechRecognition();
    const speechRecognitionList = new SpeechGrammarList();
    speechRecognitionList.addFromString(grammar, 1);
    recognition.grammars = speechRecognitionList;
    recognition.lang = 'vi-VN';
    recognition.interimResults = false;

    recognition.onresult = async function (event) {
      const lastResult = event.results.length - 1;
      const content = event.results[lastResult][0].transcript;
      setVoice(content)
      const data = {
        keySearch: content
      }
      const result = await searchProductFunc(data)
      console.log(result);
    };

    recognition.onspeechend = function () {
      recognition.stop();
    };

    recognition.onerror = function (event) {
      // setVoiceContent('Error occurred in recognition: ' + event.error);
    };

    return recognition;
  };

  const handleButtonClick = () => {
    const recognition = initializeSpeechRecognition();
    recognition.start();
  };

  const hanldeSearch = async (e) => {
    setVoice(e.target.value)
    const data = {
      keySearch: e.target.value
    }
    const result = await searchProductFunc(data);
    console.log("re", result);
    // setShowList(true);
  }

  // const hideList = () => {
  //   setShowList(false);
  // }
  const MAX_DESCRIPTION_LENGTH = 60;

  const handleLogOut = () => {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    localStorage.removeItem("password")
    localStorage.removeItem("userId")
    localStorage.removeItem("phoneOrEmail")
    navigate("/login");

  }
  return (
    <>
      <header className="header-top-strip py-3">
        <div className="container-xxl">
          <div className="row" >
            <div className="col-6" >
              <p className=" mb-0 font-c" >
                Chào Mừng Đến Với ShopDev

              </p>

            </div>
            <div className="col-6">
              <p className="text-end  mb-0">
                Hotline:<span> </span>
                <a className style={{ color: '#333' }} href="tel:+91 8264954234">
                  (+084) 69423478
                </a>
              </p>
            </div>
          </div>
        </div>
      </header>
      <header className="header-upper py-3">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-2">
              <h2>
                <Link to="/" style={{ color: '#333' }}>Shop Dev</Link>
              </h2>
            </div>
            <div className="col-5">
              <div className="input-group" style={{ position: "relative" }}>
                <input
                  type="text"
                  className="form-control py-2"
                  placeholder="Tìm Kiếm Ở Đây..."
                  aria-label="Search Product Here..."
                  aria-describedby="basic-addon2"
                  onChange={hanldeSearch}
                  value={voice}
                  style={{ borderRadius: "50px", paddingLeft: "40px" }}
                />
                <FaMicrophone
                  className="fs-6"
                  onClick={handleButtonClick}
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "10px",
                    transform: "translateY(-50%)",
                    zIndex: "1",
                    cursor: "pointer"

                  }}
                />
              </div>
             {searchProduct.length > 0 && (
  <div className='search-list' style={{borderRadius: '15px'}} >
    <List
      // itemLayout="horizontal"
      dataSource={searchProduct}
      renderItem={(item, index) => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar src={item.product_thumb} />}
            title={<a href={`product/${item._id}`}>{item.product_name}</a>}
            description={item.product_description.length > MAX_DESCRIPTION_LENGTH ?
              `${item.product_description.substring(0, MAX_DESCRIPTION_LENGTH)}...` :
              item.product_description
            }
          />
        </List.Item>
      )}
    />
  </div>
)}

            </div>
            <div className="col-5">
              <div className="header-upper-links d-flex align-items-center justify-content-between">
                <div>
                  <Link
                    to="/compare-product"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <HeartOutlined style={{ fontSize: "35px" }} />
                    <p className="mb-0">

                    </p>
                  </Link>
                </div>
                <div>
                  <Link
                    to="/chat"
                    className="d-flex align-items-center gap-10 "

                  >
                    <MessageOutlined style={{ fontSize: "35px" }} />

                    <p className="mb-0">

                    </p>
                  </Link>
                </div>

                {/* <div>
                  <Link
                    to="/login"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src={user} alt="user" />
                    <p className="mb-0">
                      Log in <br /> My Account
                    </p>
                  </Link>
                </div> */}
                <Noti />
                <div>
                  <Link
                    to="/cart"
                    className="d-flex align-items-center gap-10"
                  >
                    <ShoppingCartOutlined style={{ fontSize: "35px" }} />

                  </Link>
                </div>
                <div>
                  {/* <ModalAddress /> */}
                </div>

                {user && (
                  <div>
                    <Link
                      to="/login"
                      className="d-flex align-items-center gap-10"
                    >
                      <p className="mb-0">
                        {user?.givenName} {user?.familyName}
                      </p>
                      <img src={user?.avatar} alt="user" style={{ width: '30px', borderRadius: "100%" }} />

                    </Link>
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
      </header>
      <header className="header-bottom py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="menu-bottom d-flex align-items-center gap-30">
                <div>
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle bg-transparent border-0 gap-15 d-flex align-items-center"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img src={menu} alt="" />
                      <span className="me-5 d-inline-block">
                        {/* Shop Categories */}
                      </span>
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <Link className="dropdown-item text-white" to="">
                          Action
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item text-white" to="">
                          Another action
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item text-white" to="">
                          Something else here
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="menu-links">
                  <div className="d-flex align-items-center gap-15">
                    <NavLink to="/">Trang Chủ</NavLink>
                    <NavLink to="/product">Cửa Hàng</NavLink>
                    <NavLink to="/contact">Liên Hệ</NavLink>
                    <NavLink to="/profile">Hồ Sơ</NavLink>
                    <NavLink to="/list-ordered">Đơn Hàng</NavLink>
                    <NavLink to="/face-io">FaceIO</NavLink>
                    <NavLink to="/login" onClick={handleLogOut}>Đăng Xuất</NavLink>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
