
export const productReducer = (state, action) => {
    const { type, payload } = action
    switch (type) {
        case "LOADED_SUCCESS_PRODUCT":
            return {
                ...state,
                listProducts: payload,
                isProductLoading: false
            }
        case "LOADED_FAILED_PRODUCT":
            return {
                ...state,
                listProducts: [],
                isProductLoading: false
            }
            case "SET_SOCKET":
                return {
                    ...state,
                    socket: payload
                }
                case "SEARCH_PRODUCT":
                    return {
                        ...state,
                        searchProduct: payload
                    }

                    case "SUGGEST_PRODUCT":
                        return {
                            ...state,
                            suggestProduct: payload
                        }
        
        default:
            return state;
    }
}