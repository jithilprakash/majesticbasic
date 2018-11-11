import React, { Component } from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {getBooks} from '../../actions/bookActions';
import { Carousel,Grid,Col,Row,Button } from "react-bootstrap";
import BookItem from "./bookItem";
import  BooksForm from "./booksForm";
import Cart from "./cart";


class BooksList extends Component {
    componentDidMount(){
        this.props.getBooks();
    }
  render() {
      console.log("Testing from booklist",this.props);
      const bookList = this.props.books.map(function(booksArr){
              return(
                <Col xs={12} sm={6} md={4} key = {booksArr._id}>
                <BookItem
                _id = {booksArr._id}
                title = {booksArr.title}
                description = {booksArr.description}
                images = {booksArr.images}
                price = {booksArr.price}
                />
                </Col>
              );
          }
      );
    return (
      <Grid style={{marginTop:'15px'}}>
      <Row>
      <Carousel>
  <Carousel.Item>
    <img width={900} height={300} alt="900x300" src="images/home1.jpg" />
    <Carousel.Caption>
      <h3>First slide label</h3>
      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img width={900} height={300} alt="900x300" src="images/home2.jpg" />
    <Carousel.Caption>
      <h3>Second slide label</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img width={900} height={300} alt="900x300" src="images/home2.jpg" />
    <Carousel.Caption>
      <h3>Third slide label</h3>
      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
      </Row>
      <Row style={{marginTop:'15px'}}>
          <Cart/>
      </Row>
      <Row>
      {bookList}
      </Row>
      </Grid>

    )
  }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({getBooks:getBooks},dispatch);
}

function mapStateToProps(state){
    return {
        books : state.books.books
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(BooksList);