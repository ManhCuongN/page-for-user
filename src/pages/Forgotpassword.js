import React, {useState, useContext} from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import { AuthContext } from "../contexts/AuthContext";
const Forgotpassword = () => {


  const {forgotPassword} = useContext(AuthContext)

  const [formData, setFormData] = useState({
    phoneOrEmail: '',
    password: '',
  });



  // Hàm xử lý sự kiện khi giá trị thay đổi trong trường nhập liệu
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Hàm xử lý sự kiện khi form được submit
  const handleSubmit = async(e) => {
    e.preventDefault();
    // Bạn có thể sử dụng giá trị trong formData ở đây để thực hiện các tác vụ mong muốn
    const resutl = await forgotPassword(formData)
    if(resutl) {
      alert("Thành Công. Hãy Đăng Nhập Lại")
    }
    // Gọi hàm hoặc API để xử lý dữ liệu
  };

  return (
    <>
      <Meta title={"Forgot Password"} />
      <BreadCrumb title="Forgot Password" />
      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Lấy lại mật khẩu</h3>
              <p className="text-center mt-2 mb-3">
                Nhập Email or Số điện thoại đăng kí của bạn
              </p>
              <form action="" onSubmit={handleSubmit} className="d-flex flex-column gap-15">
                <CustomInput type="text" name="phoneOrEmail" placeholder="Email Or SĐT" 
                value={formData.phoneOrEmail}
                onChange={handleChange}
                />
                <CustomInput type="text" name="password" placeholder="Mật Khẩu Mới" 
                value={formData.password}
                onChange={handleChange}
                />
                <div>
                  <div className="mt-3 d-flex justify-content-center flex-column gap-15 align-items-center">
                    <button className="button border-0" type="submit">
                      Gửi Đi
                    </button>
                    <Link to="/login">Hủy</Link>
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

export default Forgotpassword;
