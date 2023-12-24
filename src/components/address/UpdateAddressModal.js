import Modal from "react-bootstrap/Modal";
import CustomInput from "../CustomInput";
import React, { useContext, useEffect, useState } from "react";
import { AddressContext } from "../../contexts/AddressContext";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const UpdateAddressModal = ({ addressId }) => {
  const [address, setAddress] = useState({});
  const [cityChoose, setCity] = useState([]);
  const [codeCity, setCodeCity] = useState(1);
  const [district, setDistrict] = useState([]);
  const [wards, setWards] = useState([]);
  const [codeDistrict, setCodeDistrict] = useState(1);

  const { setShowEditModal, findAddress, updateAddress } =
    useContext(AddressContext);
  useEffect(() => {
    const fetchFindAddress = async () => {
      const addressData = await findAddress(addressId);
      setAddress(addressData);
    };
    fetchFindAddress();
    return () => {
      console.log("This is will be logged on unmount");
    };
  }, [addressId]);

  const { phone, recipientName, note, city } = address;

  const handleValueChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleCityChange = (e) => {
    const selectedIndex = e.target.selectedIndex;
    setAddress({ ...address, city: e.target.options[selectedIndex].text });
    setCodeCity(e.target.value);
  };

  const handleDistrictChange = (e) => {
    const selectedIndex = e.target.selectedIndex;
    setAddress({ ...address, district: e.target.options[selectedIndex].text });
    setCodeDistrict(e.target.value);
  };

  const handleWardsChange = (e) => {
    const selectedIndex = e.target.selectedIndex;
    setAddress({ ...address, wards: e.target.options[selectedIndex].text });
  };

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

  console.log("city", address);
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
    return () => {
      console.log("Clear up");
    };
  }, []);

  const handleCloseButton = () => {
    setShowEditModal(false);
  };

  const handleSubmit = async () => {
    const updateData = await updateAddress(address);
    if (updateData.success) {
      toast.success("Update Address Successfully");
      setShowEditModal(false);
    }
  };

  return (
    <Modal show>
      <Modal.Header closeButton onClick={handleCloseButton}>
        <Modal.Title>Making progress?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="modal-content">
          <div className="modal-header py-0 border-0"></div>
          <div className="modal-body py-0">
            <div className="d-flex align-items-center">
              <form
                action=""
                className="d-flex gap-15 flex-wrap justify-content-between"
              >
                <div className="w-100">
                  <select
                    className="form-control form-select"
                    id=""
                    onChange={handleCityChange}
                  >
                    <option value="city">{city}</option>
                    {cityChoose.map((cityItem, index) => (
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
                    onChange={handleValueChange}
                    placeholder="Recipient Name"
                  />
                </div>
                <div className="flex-grow-1">
                  <CustomInput
                    type="text"
                    name="phone"
                    value={phone}
                    onChange={handleValueChange}
                    placeholder="Phone..."
                  />
                </div>

                <div className="w-100">
                  <CustomInput
                    type="text"
                    name="note"
                    value={note}
                    onChange={handleValueChange}
                    placeholder="Address Details...."
                  />
                </div>
                <div className="flex-grow-1">
                  <select
                    name=""
                    className="form-control form-select"
                    id=""
                    onChange={handleDistrictChange}
                  >
                    <option value="">Select City</option>
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
                    <option value="">Select City</option>
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
              Cancel
            </button>
            <button
              type="button"
              className="button signup"
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
          <div className="d-flex justify-content-center py-3"></div>
        </div>
      </Modal.Body>
      <ToastContainer />
    </Modal>
  );
};

export default UpdateAddressModal;
