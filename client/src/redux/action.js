
import * as actionTypes from './cartConstants.js';
import axios from 'axios';
import { url } from '../appConstants.js';

export const addToCart = ({productId, quantity, price}) => async (dispatch) => {
    try { 
        console.log("id,,, ", productId)
        // console.log("quantity.... ", quantity)
        console.log("id... ", sessionStorage.getItem("userId"))
        const productDetails = {
            userId:sessionStorage.getItem("userId"),
            "products":[{
                "productId":productId,
                quantity: quantity,
                price:price
            }]
        }
        const data = await axios.post(`${url}/product/cart`,
        {productDetails}, 
        {
            headers:
            {"Authorization": `Bearer ${sessionStorage.getItem("accessToken")}`},
            Accept: "application/json",
            productDetails
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

export const getCart = (userDetails) => async(dispatch) =>{
    try {
        const data = await axios.get(`${url}/cart/${userDetails.userId}`,
        {headers:

            {"Authorization": `Bearer ${userDetails.accessToken}`},
            Accept: "application/json"
      
          }
        )
        console.log("cart items in action.... ", data)
        if(data.cartResponse){
        dispatch({
            type: actionTypes.GET_CART, payload:{  ...data.data.cartResponse.products}
        })
    }
    } catch (error) {
        console.log("Error while calling API")
    }
}