import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from "../redux/actions";
import {Link} from "react-router-dom";
import {Redirect} from "react-router-dom";
import QtyCounter from "../components/cart/QtyCounter";
import QtyMobCounter from "../components/cart/QtyMobCounter";

import AddAddress from "../components/cart/AddAddress";
import AddDetails from "../components/cart/AddDetails";

import Address from "../components/profile/Address";
import Info from "../components/profile/Info";

class Cart extends Component {

    state = {
        subtotal: 0,
        tax: 0,
        total: 0,
        mobileDevice: false,
        checkout: false,
        auth: false,
        noAddressDisplay: false,
        noPhoneDisplay: false,
        badOrderAmountDisplay: false,
        showAddressEditing: false,
        showNameEditing: false,
        showPhoneEditing: false,
    }

    
    handleCheckout = () => {
        console.log(this.props.cart)
        if(this.props.catalog.user !== "nouser"){
            if(this.props.cart.addressIsEditing){
                this.setState({showAddressEditing: true})
            } else if(this.props.cart.nameIsEditing){
                this.setState({showNameEditing: true}) 
            } else if(this.props.cart.phoneIsEditing){
                this.setState({showPhoneEditing: true}) 
            }else if(!this.props.catalog.user.address){
                this.setState({noAddressDisplay: true})
            } else if(!this.props.catalog.user.phone){
                this.setState({noPhoneDisplay: true})
            } else if (parseInt(this.state.total) === 0){
                this.setState({badOrderAmountDisplay: true})
            } else {
                const order = {
                    cart: this.props.catalog.cart,
                    subtotal: parseFloat(this.state.subtotal),
                    tax: parseFloat(this.state.tax),
                    total: parseFloat(this.state.total),
                }
                this.props.checkout(order).then((res) => {
                    this.setState({checkout: true})
                });
            }
        } else {
            if (parseInt(this.state.total) === 0){
                this.setState({badOrderAmountDisplay: true})
            } else {
                this.setState({checkout: true})
            }
        }

    }
    
    closeModal = () => {
        this.setState({displayModal: "none"});
    }


    incrementCart = (e) =>{
        this.props.incrementCart(e.target.id);
        this.cartIsChanged(this.props.catalog.cart)
    }

    decrementCart = (e) =>{
        this.props.decrementCart(e.target.id);
        this.cartIsChanged(this.props.catalog.cart)
    }

    changeCart = (e) => {
        if(this.checkValue(e.target.value, e.target)){
            this.props.changeCart(e.target.id.split("/")[0], parseInt(e.target.value));
            this.cartIsChanged(this.props.catalog.cart)
        }
    }

    checkValue = (value , element) => {
        const allowedValues = [0,1,2,3,4,5,6,7,8,9];
        if([...allowedValues, ""].indexOf(parseInt(value)) === -1){
            console.log('incorrect value')
            element.value = "";
        }
        if(allowedValues.indexOf(parseInt(value)) !== -1){
            return true;
        } else {
            return false;
        }
    } 

    cartIsChanged = (body) => {
        this.props.cartIsChanged(body)
        this.setState({badOrderAmountDisplay:false})
    }

    deleteItem = (e) =>{
        this.props.deleteItem(parseInt(e.target.id));
        setTimeout(() => { this.cartIsChanged(this.props.catalog.cart)}, 100)
       
    }


    setAmounts = () =>{
        let subtotal = 0;
        if(this.props.catalog.cart){
            this.props.catalog.cart.forEach(item =>{
                subtotal = subtotal + item.qty*item.item.price;
            })
        }
        this.setState({subtotal: subtotal, tax: (subtotal*0.18).toFixed(2), total: (subtotal*1.18).toFixed(2)})
    }

    setUser = () => {
        if(this.props.catalog.user && this.props.catalog.user !== 'nouser'){
            this.setState({auth: true});
        }
    }

    checkIfMob = () => {
        if(window.screen.width < 769){
            this.setState({mobileDevice : true})
        }
    }

    componentDidMount(){
        this.checkIfMob()
        this.setAmounts();
        this.props.loadCart()
        this.props.loadUser()
    }
    
    componentDidUpdate(prevState){
        if(this.props.catalog.cart !== prevState.catalog.cart){
            this.setAmounts();
        }
        if(this.props.catalog.user !== prevState.catalog.user){
            this.setUser();
        }
        if(this.props.cart !== prevState.cart){
            this.setState({showAddressEditing: false, showNameEditing: false, showPhoneEditing: false, noAddressDisplay: false,  noPhoneDisplay: false})
        }
    }

    render(){
        if(this.state.checkout){
            if(this.state.auth){
                return (<Redirect to = "/checkout" />);
            } else {
                return (<Redirect to = "/auth" />);
            }
        } else {
            if(this.props.catalog.cart && this.props.catalog.cart.length > 0){
                return(this.state.checkout ? <Redirect to = "/checkout" /> :
                    <div>
                        <div className = 'container'>
                            <div className = 'cartTitle'>Shopping Bag</div>
                            <div className = 'cartWrapper'>
                                <div className = 'cartContentLeftWrapper'>
                                    <div className = 'cartContentLeft'>
                                        <div className = 'titleGrid'>
                                            <div className = 'cartItemTitleItem'>Item</div>
                                            <div className = 'cartItemTitleQty'>Qty.</div>
                                            <div className = 'cartItemTitlePrice'>Price</div>
                                            <div className = 'cartItemTitleSubtotal'>Subtotal</div>
                                        </div>
                                        {this.props.catalog.cart.map((item, index) =>(
                                            <div className = 'cartItemMobWeB'>
                                                <div key = {index} className = 'cartItemMob'>
                                                    <Link to = {"/item/" + item.item.id} className = 'cartItem__imageWrapper'><img className = 'cartItem__image' alt = 'img' src = {'/catalog/img/' + item.item.imgId}></img></Link>
                                                    <div className = 'cartItemContent'>
                                                        <Link to = {"/item/" + item.item.id} className = 'cartItem__title'>{item.item.title}</Link>
                                                        <div className = 'cartItem__size'>Size: {item.item.sizes[parseInt(item.selectedSizeId)]}</div>
                                                        <div className = 'cartItem__id'>ID: {item.item.id}</div>
                                                        <div className = 'cartItemPriceWrapper'>
                                                            <div className = 'cartItemSubtitle'>Unit price</div>
                                                            <div className = 'cartItemPrice'>${item.item.price}.00</div>
                                                        </div>
                                                        <div className = 'cartItemPriceWrapper'>
                                                            <div className = 'cartItemSubtitle'>Subtotal</div>
                                                            <div className = 'cartItemSubtotal'>${item.item.price*item.qty}.00</div>
                                                        </div>
                                                        <div className = 'controllersWrapper'>
                                                            <QtyMobCounter index = {index} item = {item} incrementCartP = {this.incrementCart} decrementCartP = {this.decrementCart} changeCartP = {this.changeCart} />
                                                            <img className = 'deleteCartItemMob' src="/item/closemodal" alt = 'del' id = {index} onClick = {this.deleteItem}></img>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div key = {index} className = 'cartItemWeb contentGrid'>
                                                    <Link to = {"/item/" + item.item.id} className = 'cartItem__imageWrapper'><img className = 'cartItem__image' alt = 'img' src = {'/catalog/img/' + item.item.imgId}></img></Link>
                                                    <div key = {index} className = 'cartItem'>
                                                        <Link to = {"/item/" + item.item.id} className = 'cartItem__title'>{item.item.title}</Link>
                                                        <div className = 'cartItem__size'>Size: {item.item.sizes[parseInt(item.selectedSizeId)]}</div>
                                                        <div className = 'cartItem__id'>ID: {item.item.id}</div>
                                                    </div>
                                                    <QtyCounter index = {index} item = {item} incrementCartP = {this.incrementCart} decrementCartP = {this.decrementCart} changeCartP = {this.changeCart} />
                                                    <div className = 'cartItemPrice'>${item.item.price}.00</div>
                                                    <div className = 'cartItemSubtotal'>${item.item.price*item.qty}.00</div>
                                                    <img className = 'deleteCartItem' src="/item/closemodal" alt = 'del' id = {index} onClick = {this.deleteItem}></img>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className = 'cart__contactDetailsTitle'>Contact details</div>
                                    <div className =  'cart__userDetails'>
                                        {this.props.catalog.user.name ? <Info cartPage = "true"/> : <AddDetails />}
                                    </div>
                                    <div className = 'cart__userAddress'>
                                        {this.props.catalog.user.name ? <Address cartPage = "true"/> : <AddAddress />}
                                    </div>
                                </div>
                                <div className = 'cartContentRight'>
                                    <div className = "cartContentRight__dataWrapper">
                                        <div className = "cartContentRight__titles">
                                            <div className = 'cartContentRight__element'>Subtotal</div>
                                            <div className = 'cartContentRight__element'>Tax</div>
                                            <div className = 'cartContentRight__element'>Shipping</div>
                                            <div className = 'cartContentRight__element cartContentRight__total'>Total</div>
                                        </div>
                                        <div className = "cartContentRight__numbers">
                                            <div className = 'cartContentRight__element'>${this.state.subtotal}</div>
                                            <div className = 'cartContentRight__element'>${this.state.tax}</div>
                                            <div className = 'cartContentRight__element'>Free</div>
                                            <div className = 'cartContentRight__element cartContentRight__total '>${this.state.total}</div>
                                        </div>
                                    </div>
                                    <div className = 'cartContentRight__actionButtonWrapper'>
                                        <div className = 'cartContentRight__actionButton' onClick = {this.handleCheckout}>Proceed to checkout</div>
                                    </div>
                                    <div className = 'cartContentRight__note_red' style ={{"display": !this.state.noAddressDisplay ? "none" : "block"}}>You have to specify your address!</div>
                                    <div className = 'cartContentRight__note_red' style ={{"display": !this.state.noPhoneDisplay ? "none" : "block"}}>You have to specify your phone!</div>
                                    <div className = 'cartContentRight__note_red' style ={{"display": !this.state.badOrderAmountDisplay ? "none" : "block"}}>Order must containt at least one item!</div>
                                    <div className = 'cartContentRight__note_red' style ={{"display": !this.state.showAddressEditing ? "none" : "block"}}>You must save your address</div>
                                    <div className = 'cartContentRight__note_red' style ={{"display": !this.state.showNameEditing ? "none" : "block"}}>You must save your name</div>
                                    <div className = 'cartContentRight__note_red' style ={{"display": !this.state.showPhoneEditing ? "none" : "block"}}>You must save your phone</div>

                                    <div className = 'cartContentRight__note'>VISA, Mastercard and PayPal are accepted</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div className = 'container'>
                        <div className = 'cartTitle'>Shopping Bag</div>
                        <div className = 'defaultCart'>You have no items in your cart</div>
                        <Link className = 'defaultCartLink' to = '/'>Start Shopping </Link>
                    </div>
                )
            }
        }
    }
}

const mapStateToProps = (store) =>{
    return({
        catalog: store.catalog,
        cart: store.cart
    })
}

const dispatchStateToProps = (dispatch) => {
    return bindActionCreators(actionCreators, dispatch)
}

export default connect(mapStateToProps, dispatchStateToProps)(Cart);