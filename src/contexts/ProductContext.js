import axios from "axios";
import { createContext, useReducer, useState } from "react";
import { productReducer } from "../reducers/ProductReducer";
import MyAxios from "../utils/myAxios";
import config from "../config";

export const ProductContext = createContext();

const ProductContextProvider = ({children}) => {
    const [productState, dispatch] = useReducer(
        productReducer,{
            productLoading:true,
            listProduct: [],
            product:null,
            socket:null, 
            suggestProduct:[],
            searchProduct: []
        }
    )

    const [messPushNotiNew, setMessPushNoti] = useState("")


    //get list product
    const getListProduct = async() => {
        try {
            const response = await axios.get(`${config.urlProductService}/product`)
            if(response.data.metadata) {
               dispatch({type:"LOADED_SUCCESS_PRODUCT",payload: response.data.metadata})
            }
            return response.data
        } catch (error) {
            dispatch({type: "LOADED_FAILED_PRODUCT"})
        }
    }

    //get product by id
    const getProductById = async(productId) => {
        try {
            const response = await axios.get(`${config.urlProductService}/product/${productId}`)
            return response.data.metadata
        } catch (error) {
            console.log("err-getProductId",error);
        }
    }

       //get product by id
       const specialProductFunc = async() => {
        try {
            const response = await axios.get(`${config.urlProductService}/product/time-product`)
            return response.data.metadata
        } catch (error) {
            console.log("err-getProductId",error);
        }
    }

    //get shopping session
    const getShoppingSession = async() => {
        const response = await axios.get(`${config.urlUserService}/shopping-session/3421-5003`)
        console.log("ré",response.data.data);
    }

    //add shopping session
    const addShoppingSession = async() => {
        try {
            const response = await axios.post()
        } catch (error) {
            
        }
    }

    const getInfoShop = async(shopId) => {
        try {
            const response = await MyAxios.get(`${config.urlProductService}/shop/getInfo/${shopId}`)
            return response.data.metadata
        } catch (error) {
            console.log("err info shop", error);
        }
    }

    const followShop = async(shopId) => {
        try {
            const response = await MyAxios.post(`${config.urlUserService}/user/follow/shop/${shopId}`)
            
                await getInfoShop(shopId)
            
            return response.data
        } catch (error) {
            console.log("err followShop", error);
        }
    }

    const followUnShop = async(shopId) => {
        try {
            const response = await MyAxios.post(`${config.urlUserService}/user/unfollow/shop/${shopId}`)
            
                await getInfoShop(shopId)
            
            return response.data
        } catch (error) {
            console.log("err followShop", error);
        }
    }

    const socketIn = (socket) => {
        try {
            
            dispatch({
                type: "SET_SOCKET",
                payload: socket,
              });
        } catch (error) {
            console.log("errooo", error);
        }
        
    }

    const searchProductFunc = async(data) => {
        try {
            const response = await MyAxios.post(`${config.urlProductService}/product/search/`, data)
            dispatch({
                type: "SEARCH_PRODUCT",
                payload: response.data.metadata,
              });

              return response.data
        } catch (error) {
            console.log("errooo", error);
        }
        
    }

    const suggestProductFunc = async(data) => {
        try {
            const response = await axios.post(`${config.urlPythonService}/recommend_product`, data)
            console.log("re", response.data);
            dispatch({
                type: "SUGGEST_PRODUCT",
                payload: response.data,
              });

              return response.data
        } catch (error) {
            console.log("errooo", error);
        }
        
    }



    //context data
    const productContextData = {
        productState,getListProduct,getShoppingSession, getProductById, getInfoShop, followShop, socketIn, 
        messPushNotiNew, setMessPushNoti,followUnShop,searchProductFunc, suggestProductFunc, specialProductFunc
    }

    return (
        <ProductContext.Provider value={productContextData}>
            {children}
        </ProductContext.Provider>
    )
}

export default ProductContextProvider;
