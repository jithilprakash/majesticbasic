import React from 'react';
import {connect} from 'react-redux';
import {Panel, Col, Row, Well, Button,
ButtonGroup, Label} from 'react-bootstrap';
import { bindActionCreators } from "redux";
import {deleteCartItem,addToCart, updateCart  } from "../../actions/cartActions";



class Cart extends React.Component{
    onDelete(_id){
      const currentCartToDelete =this.props.cart

      const indexToDelete =currentCartToDelete.findIndex( function(cart){
        return cart._id === _id;
 })
    let cartAfterDelete=  [...currentCartToDelete.slice(0,indexToDelete),...currentCartToDelete.slice(indexToDelete +1)]
     this.props.deleteCartItem(cartAfterDelete);
    }

    onIncrement(_id){
        this.props.updateCart(_id,1)
    }

    onDecrement(_id,quantity){
        if(quantity>0){
            this.props.updateCart(_id,-1)
        }
    }

    render(){
    if(this.props.cart[0]){
    return this.renderCart();
    } else {
    return this.renderEmpty();
    }
    }
 renderEmpty(){
     return(<div>,</div>);
 }

 renderCart(){
     console.log("-----inside cardjs",this.props.cart);
    const cartItemsList =  this.props.cart.map(function(cartArr){
    return(
    <Panel key={cartArr._id}>
        <Row>
            <Col xs={12} sm={4}>
                <h6>{cartArr.title}</h6><span>
                </span>
            </Col>
            <Col xs={12} sm={2}>
                <h6>inr. {cartArr.price}</h6>
            </Col>
            <Col xs={12} sm={2}>
            <h6>qty. <Label
        bsStyle="success">{cartArr.quantity}</Label></h6>
            </Col>
            <Col xs={6} sm={4}>
            <ButtonGroup
        style={{minWidth:'300px'}}>
            <Button bsStyle="default" onClick={this.onDecrement.bind(this,cartArr._id,cartArr.quantity)}  bsSize="small">-</Button>
            <Button bsStyle="default"  onClick={this.onIncrement.bind(this,cartArr._id)}  bsSize="small">+</Button>
            <span> </span>
            <Button bsStyle="danger" onClick={this.onDelete.bind(this,cartArr._id)}  bsSize="small">DELETE</Button>
            </ButtonGroup>
            </Col>
    </Row>
    </Panel>
    )
    },this)
    return(
    <Panel header="Cart" bsStyle="primary">
    {cartItemsList}
    </Panel>
    )
    }
   }
   function mapStateToProps(state){
    return{
    cart: state.cart.cart
    
    }
   }


   function mapDispatchToProps(dispatch){
       return bindActionCreators({
           deleteCartItem:deleteCartItem,
           updateCart:updateCart
           },dispatch)
   }
   export default connect(mapStateToProps,mapDispatchToProps)(Cart);
   