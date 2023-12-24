import axios from "axios";
import { createContext, useReducer, useState } from "react";
import { cartReducer } from "../reducers/CartReducer";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import config from "../config";

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
    const [cartState, dispatch] = useReducer(
        cartReducer, {
        isProductCartLoading: true,
        listProductCart: [],
        productCart: null,
        listOrderedByUser:[]
    }
    )
    const [showModalOrder, setShowModalOrder] = useState(false)

    //add to cart
    const addToCart = async (body) => {
        try {
            const add = await axios.post(`${config.urlProductService}/cart`, body)
            dispatch({ type: "LOADED_SUCCESS_PRODUCT_CART", payload: add.data.metadata })
            return add.data

        } catch (error) {
            console.log("Error cart", error.response.data.message);
        }
    }

   const  updateDiscountv2 = async(data) => {
    console.log("đấtí c",data);
    try {
        const update = await axios.patch(`${config.urlProductService}/discount/update/v2`, data)
        return update.data
    } catch (error) {
        console.log("loi update discount v2", error);
    }
   }

    //update quantity
    const updateCart = async (dataUpdate) => {
        try {
            const update = await axios.post(`${config.urlProductService}/cart/update`, dataUpdate)
            console.log("update cart",update.data.metadata );
            dispatch({ type: "LOADED_SUCCESS_PRODUCT_CART", payload: update.data.metadata })
            return update.data
        } catch (error) {
            console.log("loi update cart", error);
        }
    }
    //create shopping session
    const createShoppingSession = async (data) => {
        try {
            const shoppingCart = await axios.post(
                `${config.urlUserService}/shopping-session`,
                data
            );
            return shoppingCart;
        } catch (error) {
            console.log(error);
        }
    }
    //get list product
    const getCartOfUser = async (userId) => {
        try {
            const response = await axios.get(`${config.urlProductService}/cart?userId=${userId}`)
            dispatch({
                type: "LOADED_SUCCESS_PRODUCT_CART", payload: response.data.metadata
            })
            return response.data
        } catch (error) {
            console.log("er get cart", error);
            dispatch({ type: "LOADED_FAILED_PRODUCT_CART" })
        }
    }

    const deleteProductCart = async (data) => {
        try {
            const response = await axios.delete(`${config.urlProductService}/cart`, { data })
            dispatch({ type: "LOADED_SUCCESS_PRODUCT_CART", payload: response.data.metadata })
            return response.data
        } catch (error) {

        }
    }

    //checkout review 

    const checkOutReview = async (data) => {
        try {
            const response = await axios.post(`${config.urlProductService}/checkout/review`, data)
            console.log("ré", response.data);
            return response.data
        } catch (error) {
            console.log("loi",error.response.data.message);
            toast.error(error.response.data.message);

        }
    }

    const getAllDiscountOfProduct = async(data) => {
        try {
            const response = await axios.post(`${config.urlProductService}/discount/discount_of_product`, data)
            //console.log("discount of product", response.data);
            return response.data.metadata
        } catch (error) {
            toast.error(error.response.data.message);

        }
    }

    const paymentVNPAY = async(data) => {
        try {
            
            // console.log("contxt", amount);
            const response = await axios.post(`${config.urlSysService}/create_payment_url/`,data)
           // console.log("discount of product", response);
            return response
            // return response.data.metadata
        } catch (error) {
            console.log("err", error);
            // toast.error(error.response.data.message);

        }

     
    }
    const hanldeOrderNormal = async (data) => {
        try {
            const response = await axios.post(`${config.urlSysService}/create_payment_normal/`,data)
            return response.data
        } catch (error) {
            
        }
      }

    const getListOrderByUser = async (data) => {
        try {
            const response = await axios.post(`${config.urlUserService}/user/list/order`,data)
            console.log("re", response.data);
            dispatch({ type: "LOADED_SUCCESS_LIST_ORDER", payload: response.data })
            return response.data
        } catch (error) {
            console.log("getlisterror", error);
        }
    }

    const updateOrderToFillByUser = async (orderId) => {
        try {
            const response = await axios.patch(`${config.urlSysService}/update/order-to-fill/${orderId}`)
          
            return response.data
        } catch (error) {
            
        }
    }


      


    //context data
    const cartContextData = {
        cartState, getCartOfUser, createShoppingSession, addToCart, updateCart, deleteProductCart, checkOutReview,getAllDiscountOfProduct, paymentVNPAY,
        showModalOrder,updateDiscountv2, setShowModalOrder,hanldeOrderNormal, getListOrderByUser, updateOrderToFillByUser

    }

    return (
        <CartContext.Provider value={cartContextData}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContextProvider;
