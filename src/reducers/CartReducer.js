
export const cartReducer = (state, action) => {
    const { type, payload } = action
    switch (type) {
        case "LOADED_SUCCESS_PRODUCT_CART":
            return {
                ...state,
                listProductCart: payload,
                isProductCartLoading: false
            }
        case "LOADED_FAILED_PRODUCT_CART":
            return {
                ...state,
                listProductCart: [],
                isProductCartLoading: false
            }
        case "DELETE_PRODUCT_CART":
            return {
                ...state,
                listProductCart: state.listProductCart.cart_products.filter((post) => post.productId !== payload),
            };

        case "LOADED_SUCCESS_LIST_ORDER":
            return {
                ...state,
                listOrderedByUser: payload
            };

        default:
            return state;
    }
}