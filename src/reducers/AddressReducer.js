export const addressReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "ADD_ADDRESS":
      return {
        ...state,
        listAddress: [...state.listAddress, payload],
      };

    case "LIST_ADDRESS_LOADED_SUCCESS":
      return {
        ...state,
        listAddress: payload,
        isAddressLoading: false,
      };
    case "LIST_ADDRESS_LOADED_FAILED":
      return {
        ...state,
        listAddress: [],
        isAddressLoading: false,
      };

      case "UPDATE_ADDRESS":
      const newAddress = state.listAddress.map((post) =>
        post.idAddress === payload.idAddress ? payload : post
      );
      return {
        ...state,
        listAddress: newAddress,
      };

      case "FIND_ADDRESS":
        return {
          ...state,
          address: payload,
        };
    default:
      return state;
  }
};
