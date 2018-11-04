export function getBooks(book){
    return {
        type:"GET_BOOKS"
    }
}
export function postBooks(book){
    return {
        type:"POST_BOOKS",
        payload:book
    }
}

export function deleteBooks(id){
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