export function booksReducers(state={
    books:[{
        _id:1,
        title:"My book",
        description:"book description",
        price : 500
    },
    {
        _id:2,
        title:"New book",
        description:"new book description",
        price : 700
    }
    ]},action){


    switch(action.type){
      case "GET_BOOKS":
      return {...state,books:[...state.books]}
      break;
      case "POST_BOOKS":
      return {books:[...state.books,...action.payload]}
      break;
  
      case "DELETE_BOOK":
      const currentBookToDelete =[...state.book]

      const indexToDelete =currentBookToDelete.findIndex( function(book){
        return book._id === action.payload._id;
 })
    return {books:[...currentBookToDelete.slice(0,indexToDelete),...currentBookToDelete.slice(indexToDelete +1)]}
    break;
  
      case "UPDATE_BOOK":
      const currentBookToUpdate =[...state.book]
  
      const indexToUpdate = currentBookToUpdate.findIndex(
          function(book){
          return book._id === action.payload._id;
          }
   )
  
   const newBookToUpdate = { ...currentBookToUpdate[indexToUpdate], title: action.payload.title }
  
   console.log("what is it newBookToUpdate",newBookToUpdate);
  
   return {books:[...currentBookToUpdate.slice(0,indexToUpdate), newBookToUpdate,...currentBookToUpdate.slice(indexToUpdate + 1)]}
   break;
    }
    
    return state
  }