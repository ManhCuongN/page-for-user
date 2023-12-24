import { createContext, useReducer, useEffect, useState } from "react";
import { authReducer } from "../reducers/AuthReducer";
import setAuthToken from "../utils/AuthToken";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import config from "../config";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, {
    authLoading: true,
    isAuthenticated: false,
    user: null,
  });
  
  //check if user is authenticated
  const loadUser = async () => {
    if (localStorage[config.localToken]) {
      setAuthToken(
        localStorage[config.localToken]
      );
    }

    try {
      const response = await axios.get(
        `${config.urlUserService}/user/information`
      );
      if (response.data) {
        dispatch({
          type: "SET_AUTH",
          payload: { isAuthenticated: true, user: response.data.user },
        });
      }
   
      return response.data.user;
    } catch (error) {
      localStorage.removeItem(config.localToken);
      setAuthToken(null);
      dispatch({
        type: "SET_AUTH",
        payload: { isAuthenticated: false, user: null },
      });
    }
  };

  useEffect(() => {
    loadUser();
    return () => {
      console.log("This is will be logged on unmount");
    };
  }, []);

  //check login with google

  //Login
  const loginUser = async (data) => {
     

    try {
      const response = await axios.post(
        `${config.urlUserService}/user/login`,
        data
      );
     

      console.log("usser", response.data);
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken )
      localStorage.setItem("userId", response.data.userId)
      localStorage.setItem("phoneOrEmail", data.phoneOrEmail)
      localStorage.setItem("password", data.password)


      await loadUser();
      return response.data;
    } catch (error) {
      if (error.response) {
        if (error.response.data.errors.message) {
          toast.error(error.response.data.errors.message);
        } else {
          const errorRes = Object.values(error.response.data.errors);
          errorRes.map((errorMessage) => toast.error(errorMessage));
        }
      } else {
        console.log(error.message);
      }
    }
  };

  const uploadImageShop = async (file) => {
    try {
        const formData = new FormData()
        formData.append('file', file)
        const response = await axios.post(`${config.urlProductService}/upload/image/avatar`, formData);
        

        return response.data;
    } catch (error) {

    }
}

  /** Register
   **/
  const registerUser = async(data) => {
    console.log("data",data);
    try {
      const response = await axios.post(`${config.urlUserService}/user/register/account`, data)
      console.log("re", response.data.data.accessToken);
      if(response.data.success) 
        localStorage.setItem(
          config.localToken,
          response.data.data.accessToken
        );
      await loadUser
       return response.data
    } catch (error) {
      if (error.response) {
        if (error.response.data.errors.message) {
          toast.error(error.response.data.errors.message);
        } else {
          console.log("sấ")
          const errorRes = Object.values(error.response.data.errors);
          errorRes.map((errorMessage) => toast.error(errorMessage));
        }
      } else {
        console.log("err",error.message);
      }
    }
  }

  const registerShop = async(data) => {
    
      try {
        const response = await axios.post(`${config.urlProductService}/shop/signup`, data);
        return response.data;
        
      } catch (error) {
        alert(error)
      }
  }

  const getNotiByUser = async(userId) => {
    try {
       const result = await axios.get(`${config.urlSysService}/get-list-noti/${userId}`)
       return result.data
    } catch (error) {
      
    }
  }
  const updateUser = async(id, body) => {
    try {
      const result = await axios.patch(`${config.urlUserService}/user/update/${id}`,body)
      console.log("update", result.data);
      await loadUser()
      // return result.data
   } catch (error) {
     console.log("Looix update", error);
   }
  }

  const uploadImage = async (data) => {
    try {
        const response = await axios.post(`${config.urlProductService}/upload/image/avatar`, data);
        console.log("upload", response.data);

        return response.data;
    } catch (error) {

    }
}

  const userChats = async(id) => {
    try {
      const response = await axios.get(`${config.urlSysService}/chat/${id}`);
      console.log("useChat", response.data);
      return response.data;
  } catch (error) {

  }
  }

  const getMessages = async(id) => {
    try {
      const response = await axios.get(`${config.urlSysService}/message/${id}`);
      return response.data;
  } catch (error) {

  }
  }

  const addMessages = async(data) => {
    try {
      const response = await axios.post(`${config.urlSysService}/message/create`,data);
      return response.data;
  } catch (error) {
   console.log("add", error);
  }
  }

  const forgotPassword = async(data) => {
    try {
      const response = await axios.patch(`https://user-service-production-5aa3.up.railway.app/api/v1/user/forgot-pass`,data);
      return response.data;
  } catch (error) {
    alert(error)
  }
  }
  const [modalEditProfileUser, setModalEditProfileUser] = useState(false)



  //Context Data
  const authContextData = { loginUser,updateUser
    ,uploadImage, authState,registerShop,forgotPassword,uploadImageShop, loadUser,addMessages, userChats,getMessages, registerUser, getNotiByUser, modalEditProfileUser, setModalEditProfileUser };
  //return provider
  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
