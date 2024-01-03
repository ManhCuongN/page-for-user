import axios from "axios";
import { createContext, useReducer, useState } from "react";
import { commentReducer } from "../reducers/CommentReducer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MyAxios from "../utils/myAxios";
import config from "../config";

export const CommentContext = createContext()
const CommentContextProvider = ({children}) => {

    const [showEditModal, setShowEditModal] = useState(false)

    const [commentState, dispatch] = useReducer(commentReducer,
         {
            listComments: [],
            listCommentsOfCommentParent: [],
            isCommentLoading: true,
            singleComment: null,

         })


    // const updateComment = async(data) => {
    //   try {
    //     const response = await axios.patch(`http://localhost:3000/api/v1/comments/update`,data)
    //     dispatch({type: "UPDATE_COMMENT", payload: response.data})

    //   } catch (error) {
    //     console.log("comment error", error);
    //   }
    // }

    const updateCommentChild = async(data) => {
      try {
        const response = await axios.patch(`${config.urlUserService}/comments/update`,data)
        dispatch({type: "UPDATE_COMMENT_CHILD", payload: response.data})

      } catch (error) {
        console.log("comment error", error);
      }
    }

    //get list comment 
    const getListComment = async(productId, parentCommentId) => {
      
      try {
        if(parentCommentId) {
          const response = await MyAxios.get(`${config.urlProductService}/comment?productId=${productId}&parentCommentId=${parentCommentId}`);
          const updatedMetadata = await Promise.all(response.data.metadata.map(async (p) => {
            try {
              const userResponse = await axios.post(`${config.urlUserService}/user/check/exist`, {userId: p.comment_userId} );
              return {
                ...p,
                user: userResponse.data.user // Giả sử userResponse.data chứa thông tin của user
              };
            } catch (error) {
              console.error(error);
              return p;
            }
          }));
          response.data.metadata = updatedMetadata;
          dispatch({type: "LIST_COMMENT_LOADED_SUCCESS", payload: updatedMetadata})
        return response.data

        } else {
          const response = await MyAxios.get(`${config.urlProductService}/comment?productId=${productId}`);
          const updatedMetadata = await Promise.all(response.data.metadata.map(async (p) => {
            try {
              const userResponse = await axios.post(`${config.urlUserService}/user/check/exist`, p.comment_userId );
              return {
                ...p,
                user: userResponse.data.user // Giả sử userResponse.data chứa thông tin của user
              };
            } catch (error) {
              console.error(error);
              return p;
            }
          }));
          response.data.metadata = updatedMetadata;
          dispatch({type: "LIST_COMMENT_LOADED_SUCCESS", payload: updatedMetadata})
        return response.data

        }
        
      } catch (error) {
        console.log("err get list comment", error);
      }
    }

    
    // add comment
    const addNewComment = async(data) => {
      
      try {
        const response = await axios.post(`${config.urlProductService}/comment`,data)
          // await getListComment(response.data.metadata.comment_productId)
          await getListComment()
           dispatch({type: "ADD_COMMENT", payload: response.data.metadata})
           return response.data
      } catch (error) {
        console.log("comment error", error);
      }
    }


    //find comment 
    const findComment = async (commentId) => {
      const address = commentState.listComments.find((post) => post._id === commentId);
      dispatch({ type: "FIND_COMMENT", payload: address });

      return address
  }

   //update comment 
    const updateComment = async (commentId, bodyUpdate) => {
      console.log("comme", {commentId, bodyUpdate});
      try {
        const response = await axios.patch(`${config.urlProductService}/comment/update/${commentId}`, bodyUpdate)
        dispatch({type: "UPDATE_COMMENT", payload: response.data.metadata})
        return response.data
      } catch (error) {
        console.log("err get list comment of parent", error);
      }
}

    const getCommentsOfCommentParent = async(productId,comment_parentId) => {
      try {
        const response = await axios.get(`${config.urlProductService}/comment?productId=${productId}&parentCommentId=${comment_parentId}`)
        dispatch({type: "LIST_COMMENT_OF_PARENT_LOADED_SUCCESS", payload: response.data.metadata})
        return response.data
      } catch (error) {
        console.log("err get list comment of parent", error);
      }
    }
    

    //get list comment 
    const getListCommentChild = async(data) => {
      console.log("data chil", data);
      try {
        const response = await axios.post(`${config.urlUserService}/comments/list`,data)
        dispatch({type: "LIST_COMMENT_CHILD_LOADED_SUCCESS", payload: response.data})
        return response.data
      } catch (error) {
        console.log("err get list comment", error);
      }
    }
       //get list comment 
       const getListCommentChild2 = async(data) => {
        console.log("data chil", data);
        try {
          const response = await axios.post(`${config.urlUserService}/comments/list`,data)
          dispatch({type: "LIST_COMMENT_CHILD_CHILD_LOADED_SUCCESS", payload: response.data})

          return response.data
        } catch (error) {
          console.log("err get list comment", error);
        }
      }

      const deleteComment = async(data) => {
        console.log(data);
        try {
          const response = await axios.delete(`${config.urlProductService}/comment`,{data})
          dispatch({type: "DELETE_COMMENT", payload: response.data.metadata})
          return response.data
        } catch (error) {
          console.log("err get list comment", error);
        }
      }

      const likeComment = async(data) => {
        try {
          const response = await axios.patch(`${config.urlProductService}/comments/like`,data)
          dispatch({type: "UPDATE_COMMENT", payload: response.data})
          return response.data
        } catch (error) {
          console.log("err get list comment", error);
        }
      }

      //review star
      const reviewStar = async(data) => {
        try {
          const response = await axios.post(`${config.urlUserService}/comments/review/star`,data)
          return response.data
        } catch (error) {
          console.log("err get list comment", error);
        }
      }
      // get star
      const getStarFollowDiscuss = async(discuss_id) => {
        try {
          const response = await axios.get(`${config.urlUserService}/comments/get/star/${discuss_id}`,)
          dispatch({type: "LIST_REVIEW_STAR_SUCCESS", payload: response.data})

          return response.data
        } catch (error) {
          console.log("errr", error);
        }
      }
    
    
    //contextData 
    const commentContextData = {
        commentState,addNewComment, getListComment,getListCommentChild,getListCommentChild2, updateComment,updateCommentChild
        ,deleteComment,findComment, likeComment, reviewStar, getStarFollowDiscuss, getCommentsOfCommentParent
    };

    return (
        <CommentContext.Provider value={commentContextData}>
            {children}
        </CommentContext.Provider>    
    )

}
export default CommentContextProvider;
