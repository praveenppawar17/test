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
        default:
            return state;
    }
}


// const existItem = state.cartItems.find(product => product.id === item.id);  
// if(existItem){
//     return {
//         ...state, cartItems: state.cartItems.map(x => x.product === existItem.product ? item : x)
//     }
// } else {
//     console.log("whats her... ", item)
//     return  { ...state, cartItems: [...state.cartItems, item]}
// }