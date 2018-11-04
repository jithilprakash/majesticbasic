import React, { Component } from 'react'
import { Well,Panel,ControlLabel,FormControl,FormGroup,Button } from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {findDOMNode} from 'react-dom';

import { postBooks } from "../../actions/bookActions";

 class BooksForm extends Component {
     handleSubmit(){
         const book = [{
             title : findDOMNode(this.refs.title).value,
             description : findDOMNode(this.refs.description).value,
             price:findDOMNode(this.refs.price).value,
         }]
         this.props.postBooks(book);
     }
  render() {
    return (
      <Well>
          <Panel>
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
          </Panel>
      </Well>
    )
  }
}

function mapDispatchToProps(dispatch){
    return  bindActionCreators({postBooks},dispatch)
}

export default connect(null,mapDispatchToProps)(BooksForm);