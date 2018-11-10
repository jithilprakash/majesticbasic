import axios from "axios";
export function addToCart(cart){
    return function(dispatch){
        console.log("-----*********",cart);
        axios.post("http://localhost:3001/cart",cart)
            .then(function(response){
                dispatch({
                    type:"ADD_TO_CART",
                    payload:response.data
                })
            })
            .catch(function(err){
                dispatch({
                    type:"ADD_TO_CART_REJECTED",
                    payload:"Error adding cart data"
                })
            })
    }
    
}

export function deleteCartItem(cart){
    return {
        type:"DELETE_CART_ITEM",
        payload:cart
    }
}

export function updateCart(_id,unit,cart){
    console.log("-----*********",cart);  
    const currentBookToUpdate =cart
         const indexToUpdate = currentBookToUpdate.findIndex(
             function(book){
             return book._id === _id;
             })
        const newBookToUpdate = { ...currentBookToUpdate[indexToUpdate], 
        quantity : currentBookToUpdate[indexToUpdate].quantity + unit
        }
        let cartUpdate = [...currentBookToUpdate.slice(0,indexToUpdate), newBookToUpdate,...currentBookToUpdate.slice(indexToUpdate + 1)]
        
        return function(dispatch){
            axios.post("http://localhost:3001/cart",cartUpdate)
                .then(function(response){
                    dispatch({
                        type:"UPDATE_CART",
                        payload:response.data
                    })
                })
                .catch(function(err){
                    dispatch({
                        type:"UPDATE_CART_REJECTED",
                        payload:"Error adding cart data"
                    })
                })
        }
}