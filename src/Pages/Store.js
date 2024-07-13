import { createStore } from 'redux';

const initialState = {
    userId: 0,
    cartId: 0,
    userType: 0,
    userFav: 0,
    sellerId: 0
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'UPDATE_USER_ID':
            return { ...state, userId: action.payload };
        case 'UPDATE_CART_ID':
            return { ...state, cartId: action.payload };
        case 'UPDATE_USER_TYPE':
            return { ...state, userType: action.payload };
        case 'UPDATE_USER_FAV':
            return { ...state, userFav: action.payload };
        case 'UPDATE_SELLER_ID':
            return { ...state, sellerId: action.payload };
        default:
            return state;
    }
}

const store = createStore(rootReducer);
export const updateUserId = (userId) => {
    console.log("Update user Id: " + userId)
    store.dispatch({ type: 'UPDATE_USER_ID', payload: userId });
};
export const updateCartId = (cartId) => {
    console.log("Update cart Id: " + cartId)
    store.dispatch({ type: 'UPDATE_CART_ID', payload: cartId });
};

export const updateUserType = (userType) => {
    console.log("Update user type " + userType)
    store.dispatch({ type: 'UPDATE_USER_TYPE', payload: userType });
};

export const updateUserFav = (userFav) => {
    console.log("Update user type " + userFav)
    store.dispatch({ type: 'UPDATE_USER_FAV', payload: userFav });
};

export const updateSellerId = (sellerId) => {
    console.log("Update seller Id: " + sellerId)
    store.dispatch({ type: 'UPDATE_SELLER_ID', payload: sellerId });
};
export default store;