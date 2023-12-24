import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../contexts/AuthContext";
import FaceIO from "./FaceIO";
import { Button, Divider, Flex, Radio } from 'antd';
const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [phoneOrEmail, setPhoneOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginUser, loadUser } = useContext(AuthContext);
  const google = () => {
    window.open(
      `${process.env.REACT_APP_API_ENDPOINT_SERVER}/auth/user/google`,
      "_self"
    );
  };

  const queryParams = new URLSearchParams(location.search);
  const accessToken = queryParams.get("accessToken");
  const refreshToken = queryParams.get("refreshToken");


  //Kiểm tra accessToken và thực hiện điều hướng sau 3 giây
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    queryParams.delete("accessToken");
    queryParams.delete("refreshToken");
    const loginGoogle =  async() => {
      const result = await loadUser();
      localStorage.setItem("userId", result.idUser);

    } 
    loginGoogle()
    navigate("/");
    // setTimeout(() => {
    //   toast.success("Login successful");
    //   navigate({ search: queryParams.toString() });
      
    // }, 2000);
  }

  const handlePhoneOrEmail = (e) => {
    setPhoneOrEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      phoneOrEmail,
      password,
    };
    try {
      const loginData = await loginUser(body);
      
      if (loginData.accessToken) {
        
        toast.success("Login successful");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      console.log("err", error);
    }
  };

  

  // const handleClickFaceIO = () => {
  //   window.location.href = "http://localhost:3006/face-io"
  // }

  return (
    <>
      <Meta title={"Login"} />
      {/* <FaceIO /> */}
      <BreadCrumb title="Login" />
      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Đăng Nhập</h3>
              <form
                onSubmit={handleSubmit}
                className="d-flex flex-column gap-15"
              >
               
                <CustomInput
                  type="text"
                  name="phoneOrEmail"
                  value={phoneOrEmail}
                  onChange={handlePhoneOrEmail}
                  placeholder="Email"
                />
                <CustomInput
                  type="password"
                  name="password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Mật Khẩu"
                />
                <ToastContainer />
                <div>
                  <Link to="/forgot-password">Quên Mật Khẩu?</Link>

                  <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                    <button className="button border-0" type="submit" style={{backgroundColor: '#2ECC71'}}>
                      Đăng Nhập
                    </button>
                    <Link to="/signup" className="button signup">
                      Đăng Kí
                    </Link>
                   
                  </div>
                  
                  
                </div>
                <Button type="success" shape="round"  size='large' style={{backgroundColor: 'rgb(155, 89, 182)'}}>
                    <Link to="" onClick={google} className="loginButton google" style={{color: '#fff'}}>
                      Đăng Nhập với Google
                    </Link>
                </Button>
                <Button type="success" shape="round"  size='large' style={{backgroundColor: 'rgb(155, 89, 182)'}}>
                    <Link to="/sign-up-shop"  className="loginButton google" style={{color: '#fff'}}>
                      Đăng Nhập Với Tư Cách Shop
                    </Link>
                </Button>
              </form>

              {/* <div className="loginButton google" onClick={google}>
                <img src="" alt="" className="icon" />
                Google
              </div> */}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Login;
