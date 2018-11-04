import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import { logger } from "redux-logger";
import reducers from "./reducers/index";
import  addToCart  from "./actions/cartActions";

import { updateBooks,deleteBooks } from "./actions/bookActions";
import BooksList from './components/pages/booksList';


const middeware = applyMiddleware(logger);
const store = createStore(reducers,middeware);

// store.subscribe(function(){
//   console.log("current state ",store.getState())
// })



// store.dispatch({type:"POST_BOOK",payload:})

// store.dispatch(deleteBooks({id:1}))
// store.dispatch({type:"DELETE_BOOK",payload:{
//     id:1
// }
// })


// store.dispatch(updateBooks({id:2,title:"React learning"}))



//--------------------cart actions
// store.dispatch(addToCart({id:2}))


ReactDOM.render(<Provider store={store}><BooksList /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
