export const commentReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "ADD_COMMENT":
      return {
        ...state,
        listComments: [...state.listComments, payload],
      };
      case "FIND_COMMENT":
        return {
          ...state,
          singleComment: payload,
        };
      case "UPDATE_COMMENT":
        const newComment = state.listComments.map((post) =>
        post._id === payload._id ? payload : post
      );
      return {
        ...state,
        listComments: newComment,
      };

      case "DELETE_COMMENT":
        return {
          ...state,
          listComments: state.listComments.filter((post) => post._id !== payload._id),
         
        };

    case "LIST_COMMENT_LOADED_SUCCESS":
      return {
        ...state,
        listComments: payload,
        isCommentLoading: false,
      };
      case "LIST_COMMENT_OF_PARENT_LOADED_SUCCESS":
      return {
        ...state,
        listCommentsOfCommentParent: payload,
      };
      case "LIST_REVIEW_STAR_SUCCESS":
      return {
        ...state,
        starData: payload,
        
      };

    //   return {
    //     ...state,
    //     listAddress: [],
    //     isAddressLoading: false,
    //   };

    //   case "UPDATE_ADDRESS":
    //   const newAddress = state.listAddress.map((post) =>
    //     post.idAddress === payload.idAddress ? payload : post
    //   );
    //   return {
    //     ...state,
    //     listAddress: newAddress,
    //   };

    //   case "FIND_ADDRESS":
    //     return {
    //       ...state,
    //       address: payload,
    //     };
    default:
      return state;
  }
};
