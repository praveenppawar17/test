import * as actionTypes from './cartConstants.js';

export const cartReducer = (state = { cartItems: []}, action) => {
    switch(action.type) {
        case actionTypes.ADD_TO_CART:
            const item = action.payload;
            console.log("item...? ", item)
              

                console.log("whats her... ", item)
                return  { ...state, cartItems: [...state.cartItems, item]}
            
        case actionTypes.TOGGLE:
            const products = action.payload
            return {
                ...state, products, toggle:true
            }
        case actionTypes.GET_CART: 
        // const cartItems = action.payload
        console.log("in reducer for cart items.... ", action.payload)
        return {...state, cartItems: [ action.payload]}
        default:
            return state;
    }
}

