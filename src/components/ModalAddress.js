import React, { useContext, useEffect, useState } from "react";
import CustomInput from "./CustomInput";
import axios from "axios";
import { AddressContext } from "../contexts/AddressContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ModalAddress = () => {
  const [city, setCity] = useState([]);
  const [district, setDistrict] = useState([]);
  const [wards, setWards] = useState([]);
  const [codeCity, setCodeCity] = useState(1);
  const [codeDistrict, setCodeDistrict] = useState(1);
  const [nameCity, setNameCity] = useState("");
  const [nameDistrict, setNameDistrict] = useState("");
  const [nameWards, setNameWards] = useState("");
  const [recipientName, setRecipientName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [note, setNote] = useState("")
  const {addAddress} = useContext(AddressContext)


  useEffect(() => {
    // Fetch data for cities and set them in the 'city' state
    const fetchCityData = async () => {
      try {
        const host = "https://provinces.open-api.vn/api/?depth=1";
        const res = await axios.get(host, {});
        setCity(res.data);
      } catch (error) {
        console.log("Err", error);
      }
    };

    fetchCityData();
  }, []);

  useEffect(() => {
    // Fetch data for districts based on the selected city and set them in the 'district' state
    const fetchDistrictData = async () => {
      try {
        const host = `https://provinces.open-api.vn/api/p/${codeCity}?depth=2`;
        const res = await axios.get(host, {});
        setDistrict(res.data.districts);
      } catch (error) {
        console.log("Err", error);
      }
    };

    fetchDistrictData();
  }, [codeCity]); // Sử dụng useEffect theo dõi sự thay đổi của codeCity

  useEffect(() => {
    // Fetch data for districts based on the selected city and set them in the 'district' state
    const fetchWardData = async () => {
      try {
        const host = `https://provinces.open-api.vn/api/d/${codeDistrict}?depth=2`;
        const res = await axios.get(host, {});
        setWards(res.data.wards);
      } catch (error) {
        console.log("Err", error);
      }
    };

    fetchWardData();
  }, [codeDistrict]); // Sử dụng useEffect theo dõi sự thay đổi của codeCity

  const handleCityChange = (e) => {
    const selectedCodeCity = e.target.value;
    setCodeCity(selectedCodeCity); // Cập nhật giá trị codeCity mới
    const selectedIndex = e.target.selectedIndex;
    setNameCity(e.target.options[selectedIndex].text);
  };

  const handleDistrictChange = (e) => {
    const selectedCodeDistrict = e.target.value;
    setCodeDistrict(selectedCodeDistrict); // Cập nhật giá trị codeCity mới
    const selectedIndex = e.target.selectedIndex;
    setNameDistrict(e.target.options[selectedIndex].text);
  };
  const handleWardsChange = (e) => {
    const selectedIndex = e.target.selectedIndex;
    setNameWards(e.target.options[selectedIndex].text);
  };

  const handleReciChange = (e) => {
    setRecipientName(e.target.value)
  }

  const handlePhoneChange = (e) => {
    setPhone(e.target.value)
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handleNoteChange = (e) => {
    setNote(e.target.value)
  }
  const handleSubmit = async() => {
    const body = {
      city: nameCity,
      district: nameDistrict,
      wards: nameWards,
      phone,note,recipientName, email
    }
    try {
      const addressData = await addAddress(body)
      if(addressData.success) {
        toast.success("Created Address Suceessfully")
      }
    } catch (error) {
      console.log("errr", error);
    }
  };


  return (
    <>
      <button
      style={{height: '30px', width: '110px', borderRadius: '5px', backgroundColor: '#0D2D53', color:'#fff', marginBottom: '40px'}}
       
      >
        Thêm Địa Chỉ
      </button>

      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered ">
          <div className="modal-content">
            <div className="modal-header py-0 border-0">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body py-0">
              <div className="d-flex align-items-center">
                <form
                  action=""
                  className="d-flex gap-15 flex-wrap justify-content-between"
                >
                  <div className="w-100">
                    <select
                      name=""
                      className="form-control form-select"
                      id=""
                      onChange={handleCityChange}
                    >
                      <option value="">Thành Phố</option>
                      {city.map((cityItem, index) => (
                        <option key={index} value={cityItem.code}>
                          {cityItem.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex-grow-1">
                    <CustomInput
                      type="text"
                      name="recipientName"
                      value={recipientName}
                      onChange={handleReciChange}
                      placeholder="Tên Người Nhận"
                    />
                  </div>
                  <div className="flex-grow-1">
                    <CustomInput
                      type="text"
                      name="phone"
                      value={phone}
                      onChange={handlePhoneChange}
                      placeholder="Số điện thoại..."
                    />
                  </div>
                  <div className="flex-grow-1">
                    <CustomInput
                      type="text"
                      name="email"
                      value={email}
                      onChange={handleEmailChange}
                      placeholder="Email..."
                    />
                  </div>

                  <div className="w-100">
                    <CustomInput
                      type="text"
                      name="note"
                      value={note}
                      onChange={handleNoteChange}
                      placeholder="Địa Chỉ Chi Tiết...."
                    />
                  </div>
                  <div className="flex-grow-1">
                    <select
                      name=""
                      className="form-control form-select"
                      id=""
                      onChange={handleDistrictChange}
                    >
                      <option value="">Quận/Huỵên</option>
                      {district.map((cityItem, index) => (
                        <option key={index} value={cityItem.code}>
                          {cityItem.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex-grow-1">
                    <select
                      name=""
                      className="form-control form-select"
                      id=""
                      onChange={handleWardsChange}
                    >
                      <option value="">Xã/Phường</option>
                      {wards.map((cityItem, index) => (
                        <option key={index} value={cityItem.name}>
                          {cityItem.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* <div className="flex-grow-1">
                    <CustomInput type="text" name="phone" placeholder="Number Phone...."  />
                  </div> */}
                </form>
              </div>
            </div>
            <br />
            <div className="modal-footer border-0 py-0 justify-content-center gap-30">
              <button type="button" className="button" data-bs-dismiss="modal">
                Hủy
              </button>
              <button
                type="button"
                className="button signup"
                onClick={handleSubmit}
              >
                Lưu
              </button>
            </div>
            <div className="d-flex justify-content-center py-3"></div>
          </div>
        </div>
        <ToastContainer/>
      </div>
    </>
  );
};
export default ModalAddress;
