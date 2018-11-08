import React, { Component } from 'react'
import { Well,Panel,ControlLabel,FormControl,FormGroup,Button } from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {findDOMNode} from 'react-dom';

import { postBooks,deleteBooks } from "../../actions/bookActions";

 class BooksForm extends Component {
     handleSubmit(){
         const book = [{
             title : findDOMNode(this.refs.title).value,
             description : findDOMNode(this.refs.description).value,
             price:findDOMNode(this.refs.price).value,
         }]
         this.props.postBooks(book);
     }
     onDelete(){
         let bookId = findDOMNode(this.refs.delete).value;
         this.props.deleteBooks(bookId)
     }
  render() {

    const booksList = this.props.books.map(function(booksArr){
        return(<option key={booksArr._id}>{booksArr._id}</option>);
    })
    return (
      <Well>
          <Panel>
              <Panel.Body>
              <FormGroup controlId="title">
                <ControlLabel>Title</ControlLabel>
                <FormControl
                type="text"
                placeholder="title"
                ref="title"
                />
              </FormGroup>

               <FormGroup controlId="description">
                <ControlLabel>Description</ControlLabel>
                <FormControl
                type="text"
                placeholder="description"
                ref="description"
                />
              </FormGroup>

               <FormGroup controlId="price">
                <ControlLabel>Price</ControlLabel>
                <FormControl
                type="text"
                placeholder="price"
                ref="price"
                />
              </FormGroup>

              <Button
              onClick = {this.handleSubmit.bind(this)}
              bsStyle='primary'>Save book</Button>
              </Panel.Body>
          </Panel>
          <Panel style={{marginTop:'25px'}}>
          <Panel.Body>
          <FormGroup controlId="formControlsSelect">
            <ControlLabel>Select a book id to delete</ControlLabel>
            <FormControl ref="delete" componentClass="select" placeholder="select">
                <option value="select">select</option>
                {booksList}
            </FormControl>
            </FormGroup>
            <Button onClick={this.onDelete.bind(this)} bsStyle="danger">Delete</Button>
            </Panel.Body>
           
          </Panel>
      </Well>
    )
  }
}

function mapDispatchToProps(dispatch){
    return  bindActionCreators({postBooks,deleteBooks},dispatch)
}

function mapStateToProps(state){
    return{
        books : state.books.books
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(BooksForm);