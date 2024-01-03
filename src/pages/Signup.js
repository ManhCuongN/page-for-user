import React, { useContext, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { useNavigate, Link } from "react-router-dom";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer,toast } from "react-toastify";
import { AuthContext } from "../contexts/AuthContext";
import { Button } from 'antd';

const Signup = () => {
  const navigate = useNavigate();
  const {registerUser} = useContext(AuthContext)
  const [registerForm, setRegisterForm] = useState({
    givenName: "",
    familyName:"",
    phone:"",    
    password: "",
    email: "",
  });
  const {  
  givenName,
  familyName,
  phone,    
  password,
  email } = registerForm;

  const onChangeRegisterForm = (e) =>
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });

  const handleSubmit = async(e) => {
    e.preventDefault();
   
     try {
       const registerData = await registerUser(registerForm)
       if(registerData.success) {
        toast.success("Sign up successful");
        setTimeout(() => {
          navigate("/");
        }, 2000);
       }
     } catch (error) {
      
     }
  }
  return (
    <>
      <Meta title={"Sign Up"} />
      <BreadCrumb title="Đăng Kí" />
      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Đăng Kí</h3>
              <form  className="d-flex flex-column gap-15" onSubmit={handleSubmit}>
                <CustomInput type="text" name="familyName" placeholder="Tên" value={familyName}  onChange={onChangeRegisterForm} />
                <CustomInput type="text" name="givenName" placeholder="Họ" value={givenName}  onChange={onChangeRegisterForm} />
                <CustomInput
                  type="tel"
                  name="phone"
                  value={phone}  
                  onChange={onChangeRegisterForm}
                  placeholder="Số Điện Thoại"
                />
                <ToastContainer />

                <CustomInput
                  type="password"
                  name="password"
                  value={password}
                    onChange={onChangeRegisterForm}
                  placeholder="Mật Khẩu"
                />
                <CustomInput type="text" 
                name="email"
                value={email}  
                onChange={onChangeRegisterForm}
                 placeholder="Email" />
                <div>
                  <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                    <button className="button border-0" style={{backgroundColor: '#0D2D53'}}>Đăng Kí</button> 
                    

                  </div>
                  <Button type="success" shape="round"  size='large' style={{ marginLeft: "120px", marginTop: "20px"}} className="buttonn-lo">
                    <Link to="/sign-up-shop"  className="loginButton google" style={{color: '#fff'}}>
                      Đăng Kí Với Tư Cách Shop
                    </Link>
                   </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Signup;
