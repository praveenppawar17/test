
import * as actionTypes from './cartConstants.js';
import axios from 'axios';
import { url } from '../appConstants.js';

export const addToCart = (productId, quantity, price) => async (dispatch) => {
    try { 
        console.log("id,,, ", productId)
        // console.log("quantity.... ", quantity)
        console.log("id... ", sessionStorage.getItem("userId"))
        const data = await axios.post(`${url}/product/cart`, 
        {
            "userId":sessionStorage.getItem("userId"),
            "products":[{
                "productId":productId,
                quantity: quantity,
                price:price
            }
            ]
        }
        )
        console.log("data... ", data)
        dispatch({ type: actionTypes.ADD_TO_CART, payload: { ...data.data.cartResponse.products, quantity } });

    } catch (error) {
        console.log('Error while calling API');
    }
};

export const updateToggle = (filteredProducts) => async (dispatch) => {
    try {
        dispatch({
            type: actionTypes.TOGGLE, payload: filteredProducts
        })
    } catch (error) {
        console.log('Error while calling API');
    }
}
