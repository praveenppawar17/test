
import * as actionTypes from './cartConstants.js';
import axios from 'axios';
import { url } from '../appConstants.js';

export const addToCart = (id, quantity) => async (dispatch) => {
    try { 
        console.log("id,,, ", id)
        // console.log("quantity.... ", quantity)
        console.log("id... ", sessionStorage.getItem("userId"))
        const data = await axios.post(`${url}/product/cart`, 
        {
            "userId":sessionStorage.getItem("userId"),
            "products":[{
                "productId":id,
            }
            ]
        }
        )
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
