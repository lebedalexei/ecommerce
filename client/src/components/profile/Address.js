import React, {Component} from "react";
import {connect} from 'react-redux'
import * as actionCreators from "../../redux/actions";
import {bindActionCreators} from "redux";

class Address extends Component {

    state = {
        edit: false
    }

    setEditTrue = () => {
        document.getElementById('profile__addressInput').value = this.props.catalog.user.address ? this.props.catalog.user.address : "";
        this.setState({edit: true})
        this.props.setEditAddressTrue();
    }

    setEditFalse= () => {
        this.setState({edit: false});
        this.props.setEditAddressFalse();
    }

    saveAddress = (e) => {
        this.setEditFalse();
        const address = document.getElementById('profile__addressInput').value;
        this.props.changeAddress(address).then((res) => {
            console.log(res);
        })
    }

    render(){
        if(this.props.catalog.user.address){
            return(
                <div className = { this.props.cartPage !== "true" ? "profileContainer" : "profileContainer , addressContainerCart" }>
                    <div className = {this.props.cartPage !== "true" ? 'profile_addressWrapper' : "profile_addressWrapper profile_addressWrapperCart" }>
                        <div className = "profile_sectionTitle">Shipping address</div>
                        <div className = "auth__input profile_addressNonEdit" style = {{"display": this.state.edit ? "none" : "block" }}>{this.props.catalog.user.address}</div>
                        <div className = 'profile_addAddressButton profile_saveButton' style = {{"display": !this.state.edit ? "block" : "none" }} onClick = {this.setEditTrue}>EDIT</div>
                        <input id = "profile__addressInput" className = 'auth__input profile_input' style = {{"display": this.state.edit ? "block" : "none" }} placeholder = "Enter your address"></input>
                        <div className = 'profile_addAddressButton profile_saveButton' style = {{"display": this.state.edit ? "block" : "none" }} onClick = {this.saveAddress}>save</div>
                    </div>
                </div>
            )   
        } else {
            return(
                <div className = { this.props.cartPage !== "true" ? "profileContainer" : "profileContainer , addressContainerCart" }>
                    <div className = {this.props.cartPage !== "true" ? 'profile_addressWrapper ' : "profile_addressWrapper profile_addressWrapperCart" }>
                        <div className = "profile_sectionTitle">Shipping address</div>
                        <div className = 'profile_addAddressBtn' style = {{"display": !this.state.edit ? "block" : "none" }} onClick = {this.setEditTrue}>Add shipping address</div>
                        <input id = "profile__addressInput" className = 'auth__input profile_input' style = {{"display": this.state.edit ? "block" : "none" }} placeholder = "Enter your address"></input>
                        <div className = 'profile_addAddressButton profile_saveButton' style = {{"display": this.state.edit ? "block" : "none" }} onClick = {this.saveAddress}>save</div>
                    </div>
                </div>
            )
        }
    }
}

const mapStateToProps = (store) =>{
    return({
        catalog: store.catalog,
        newCatalog: store.newCatalog,
        cart: store.cart
    })
}

const dispatchStateToProps = (dispatch)=>{
    return bindActionCreators(actionCreators, dispatch)
}

export default connect(mapStateToProps, dispatchStateToProps)(Address);


