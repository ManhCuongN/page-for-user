import axios from "axios";
import { createContext, useReducer, useState } from "react";
import { addressReducer } from "../reducers/AddressReducer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import config from "../config";

export const AddressContext = createContext()
const AddressContextProvider = ({children}) => {

    const [showEditModal, setShowEditModal] = useState(false)

    const [addressState, dispatch] = useReducer(addressReducer,
         {
            listAddress: [],
            isAddressLoading: true,
            address: null
         })

    // get address
    const getListAddress = async() => {
         try {
            const response = await axios.get(`${config.urlUserService}/address/follow/user`);
            if(response.data.success) {
               
                dispatch({type: "LIST_ADDRESS_LOADED_SUCCESS", payload: response.data.data})
            }
         } catch (error) {
              dispatch({ type: "LIST_ADDRESS_LOADED_FAILED" });
         }
    }

    //add address
    const addAddress = async(newAddress) => {
        try {
            const res = await axios.post(`${config.urlUserService}/address/create`,newAddress);
            if(res.data.success) {
                dispatch({type: "ADD_ADDRESS", payload: res.data.data})
            }
            return res.data;
        } catch (error) {
            if (error.response) {
                if (error.response.data.errors.message) {
                  toast.error(error.response.data.errors.message);
                } else {
                  const errorRes = Object.values(error.response.data.errors);
                  errorRes.map((errorMessage) => toast.error(errorMessage));
                }
              } else {
                console.log("err",error.message);
              }
        }
    }

    //Update Post
  const updateAddress = async (updatePost) => {
    console.log("idADDD", updatePost.idAddress);
    const newObject = { ...updatePost };
    delete newObject.idAddress;
    try {
      const response = await axios.patch(
        `${config.urlUserService}/address/update/${updatePost.idAddress}`,
        newObject
      );
      console.log("respo",response);
      if (response.data.success) {
        dispatch({ type: "UPDATE_ADDRESS", payload: response.data.data });
        return response.data;
      }
    } catch (error) {
        console.log("err update",error);
    //   if (error.response.data) return error.response.data;
    //   else return { status: false, message: error.message };
    }
  };

    //find address 
    const findAddress = async (addressId) => {
        const address = addressState.listAddress.find((post) => post.idAddress === addressId);
        
        dispatch({ type: "FIND_ADDRESS", payload: address });
        return address
    }


    //contextData 
    const addressContextData = {
        addressState,addAddress, getListAddress, findAddress,showEditModal,setShowEditModal,updateAddress
    };

    return (
        <AddressContext.Provider value={addressContextData}>
            {children}
        </AddressContext.Provider>    
    )

}
export default AddressContextProvider;
