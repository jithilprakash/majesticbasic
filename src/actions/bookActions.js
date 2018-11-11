import axios from 'axios';

export function getBooks(book){
    return function(dispatch){
        axios.get("http://localhost:3001/books",book)
            .then(function(response){
                dispatch({type:"GET_BOOKS",payload:response.data})
            })
            .catch(function(err){
                dispatch({type:"GET_BOOKS_REJECTED",payload:"Error while getting books"})
            })
    }

}
export function postBooks(book){
    return function(dispatch){
        axios.post("http://localhost:3001/books",book)
            .then(function(response){
                dispatch({type:"POST_BOOKS",payload:response.data})
            })
            .catch(function(err){
                dispatch({type:"POST_BOOKS_REJECTED",payload:"Error while posting books"})
            })
    }
}

export function deleteBooks(id){
    return function(dispatch){
    axios.delete("http://localhost:3001/books/"+id)
        .then(function(response){
            dispatch({type:"DELETE_BOOK",payload:id})
        })
        .catch(function(err){
            dispatch({type:"DELETE_BOOK_REJECTED",payload:"Delete failed"})
        })
    }
    return {
        type:"DELETE_BOOK",
        payload:id
    }
}

export function updateBooks(book){
    return {
        type:"UPDATE_BOOK",
        payload:book
    }
}


export function resetBooks(){
    return {
        type:"RESET_BUTTON"
    }
}