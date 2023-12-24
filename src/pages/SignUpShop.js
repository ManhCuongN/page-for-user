import React, { useContext, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { useNavigate } from "react-router-dom";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer,toast } from "react-toastify";
import { AuthContext } from "../contexts/AuthContext";
import { Upload, Modal } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const SignUpShop = () => {
  const navigate = useNavigate();
  const [productThumb, setProductThumb] = useState(null)

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const {registerShop, uploadImageShop} = useContext(AuthContext)
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email:"",
    phone:"",    
    password: "",
    address: "",
    identification: ""
  });
  const {  
    name,
    email,
    phone,    
    password,
    address,
    identification } = registerForm;

    const handleCancel = () => setPreviewOpen(false);

    const myCustomRequest = async ({ file, onSuccess, onError }) => {
      try {
        const res = await uploadImageShop(file)
        console.log("res", res);
        await setProductThumb(res?.metadata?.image_url);
        onSuccess();
  
      } catch (error) {
        console.log("loi upload thum", error);
      }
    }

  const onChangeRegisterForm = (e) =>
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });

  const handleSubmit = async(e) => {
    e.preventDefault();
   
     try {
      const data = {
        ...registerForm,
        identification: productThumb
      }
      
       const registerData = await registerShop(data)
       
       if(registerData) {
        toast.success("Đăng Kí Thành Công");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
       }
     } catch (error) {
      
     }
  }

  
  const uploadButton = (
    <div>
      {"" ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
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
                <CustomInput type="text" name="name" placeholder="Tên Shop" value={name}  onChange={onChangeRegisterForm} />
                <CustomInput type="text" name="email" placeholder="Email" value={email}  onChange={onChangeRegisterForm} />
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
                name="address"
                value={address}  
                onChange={onChangeRegisterForm}
                 placeholder="Địa Chỉ" />
                <div>
                  <p>CMND/CCCD</p>
                          <Upload
                              listType="picture-card"
                              productThumb={productThumb}
                              customRequest={myCustomRequest}
                            >
                              {uploadButton}
                            </Upload>
                          
                          <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                            <img alt="example" style={{ width: '100%' }} src={previewImage} />
                          </Modal>
                  <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                    <button className="button border-0" style={{backgroundColor: '#2ECC71'}}>Đăng Kí</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default SignUpShop;
