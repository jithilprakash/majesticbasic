import React, { Component } from 'react'
import { MenuItem,InputGroup,DropdownButton,Image,Col,Row,Well,Panel,ControlLabel,FormControl,FormGroup,Button } from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {findDOMNode} from 'react-dom';
import axios from "axios";
import { postBooks,deleteBooks,getBooks,resetBooks } from "../../actions/bookActions";

 class BooksForm extends Component {
    
     constructor(){
         super();
         
         this.state = {
             images : [{}],
             img :'',
             url:'http://localhost:3001/images',
             imageUrl :''
         }
     }

     componentDidMount(){
        this.props.getBooks();
         axios.get(this.state.url)
            .then(function(response){
                this.setState({images : response.data})
            }.bind(this))
            .catch(function(err){
                this.setState({images:'error loaging images',img:''})
            }.bind(this))
     }
     handleSubmit(){
         const book = [{
             
             title : findDOMNode(this.refs.title).value,
             description : findDOMNode(this.refs.description).value,
             images : this.state.imageUrl,
             price:findDOMNode(this.refs.price).value,
         }]
         this.props.postBooks(book);
     }

     resetForm(){
        
        findDOMNode(this.refs.title).value = ''
        findDOMNode(this.refs.description).value=''
        findDOMNode(this.refs.image).value=''
        this.setState({imageUrl:'',img:''})
        findDOMNode(this.refs.price).value=''
        this.props.resetBooks();
     }
     onDelete(){
         let bookId = findDOMNode(this.refs.delete).value;
         this.props.deleteBooks(bookId)
     }

     handleOnSelect(img){
        this.setState({
            img : '/'+img,
            imageUrl : this.state.url+'/'+img
        })
     }
  render() {

    const booksList = this.props.books.map(function(booksArr){
        return(<option key={booksArr._id}>{booksArr._id}</option>);
    })

    const imgList = this.state.images.map(function(imgArr,i){
        return(
            <MenuItem key={i} eventKey={imgArr.name}
            onClick={this.handleOnSelect.bind(this,imgArr.name)}
            >{imgArr.name}</MenuItem>
        );
    },this)
    return (
      <Well>
          <Row>
              <Col xs={12} sm={6}>
              
              <InputGroup>
            <FormControl type="text" ref="image" value={this.state.img} />
            <DropdownButton
                componentClass={InputGroup.Button}
                id="input-dropdown-addon"
                title="Select an image"
                bsStyle="primary"
            >
               {imgList}
            </DropdownButton>
        </InputGroup>
        <Image src={this.state.imageUrl} responsive/>

              </Col>
              <Col xs={12} sm={6}>
              <Panel>
              <Panel.Body>
              <FormGroup controlId="title" validationState={this.props.validation}>
                <ControlLabel>Title</ControlLabel>
                <FormControl
                type="text"
                placeholder="title"
                ref="title"
                />
                <FormControl.Feedback/>
              </FormGroup>

               <FormGroup controlId="description" validationState={this.props.validation}>
                <ControlLabel>Description</ControlLabel>
                <FormControl
                type="text"
                placeholder="description"
                ref="description"
                />
                <FormControl.Feedback/>
              </FormGroup>

               <FormGroup controlId="price" validationState={this.props.validation}>
                <ControlLabel>Price</ControlLabel>
                <FormControl
                type="text"
                placeholder="price"
                ref="price"
                />
                <FormControl.Feedback/>
              </FormGroup>

              <Button
              onClick = {(!this.props.msg)?(this.handleSubmit.bind(this)):(this.resetForm.bind(this))}
              bsStyle={(!this.props.style)?("primary"):(this.props.style)}
              >{(!this.props.msg)?("Save book"):(this.props.msg)}</Button>
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
              </Col>
              
         </Row>
          
      </Well>
    )
  }
}

function mapDispatchToProps(dispatch){
    return  bindActionCreators({postBooks,deleteBooks,getBooks,resetBooks},dispatch)
}

function mapStateToProps(state){
    return{
        books : state.books.books,
        msg : state.books.msg,
        style : state.books.style,
        validation : state.books.validation
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(BooksForm);