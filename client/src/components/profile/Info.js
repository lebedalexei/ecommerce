import React, {Component} from "react";
import {connect} from 'react-redux'
import * as actionCreators from "../../redux/actions";
import {bindActionCreators} from "redux";

class Info extends Component {

    state = {
        editName: false,
        editPhone: false
    }


    setEditNameTrue = () => {
        document.getElementById('profile__nameInput').value = this.props.catalog.user.name ? this.props.catalog.user.name : "";
        this.setState({editName: true});
        this.props.setEditNameTrue();
    }

    setEditNameFalse= () => {
        this.setState({editName: false});
        this.props.setEditNameFalse();
    }

    setEditPhoneTrue = () => {
        document.getElementById('profile__phoneInput').value = this.props.catalog.user.phone ? this.props.catalog.user.phone : "";
        this.setState({editPhone: true});
        this.props.setEditPhoneTrue();
    }

    setEditPhoneFalse= () => {
        this.setState({editPhone: false})
        this.props.setEditPhoneFalse();
    }

    saveName = () => {
        this.setEditNameFalse();
        const newName = document.getElementById('profile__nameInput').value;
        this.props.changeName(newName).then((res) => {
            console.log(res);
        })
    }

    savePhone = () => {
        this.setEditPhoneFalse();
        const newPhone = document.getElementById('profile__phoneInput').value;
        this.props.changePhone(newPhone).then((res) => {
            console.log(res);
        })
    }

    handleInputValue = (e) => {
        const config = ["0","1","2","3","4","5","6","7","8","9", "+", ")", "(", "-"];
        let arr = e.target.value.split("");
        for(let i = 0; i < arr.length; i++){
            if(config.indexOf(arr[i]) === -1){
                console.log('incorrect symbol')
                delete arr[i]
            }
            if(i > 15){
                delete arr[i]
            }
            switch(i){
                case 0:
                    if(arr[i] !== "+"){
                        arr.unshift("+")
                    }
                    break
                case 2:
                    if(arr[i] !== "("){
                        arr.splice(i, 0, "(")
                        i = 0;
                    }
                    break;
                case 6:
                    if(arr[i] !== ")"){
                        arr.splice(i, 0, ")")
                        i = 0;
                    }
                    break;
                case 10:
                    if(arr[i] !== "-"){
                        arr.splice(i, 0, "-")
                        i = 0;
                    }
                    break;
                case 13:
                    if(arr[i] !== "-"){
                        arr.splice(i, 0, "-")
                        i = 0;
                    }
                    break;
                default: break;
            }
        }
        document.getElementById('profile__phoneInput').value = arr.join('')
    }

    render(){
        if(this.props.catalog.user.name){
            return(
                <div className = { this.props.cartPage !== "true" ? "profileContainer" : "profileContainer , profileContainerCart" }>
                    <div className = 'profile_addressWrapper'>
                        <div className = "profile_sectionTitle">Contact info</div>
                        <div    
                            className = "auth__input profile_addressNonEdit" 
                            style = {{"display": this.state.editName || this.state.editPhone ? "none" : "block" }}>
                            {this.props.catalog.user.name}
                        </div>
                        <div    
                            className = 'profile_addAddressButton profile_saveButton' 
                            style = {{"display": !this.state.editPhone && !this.state.editName ? "block" : "none" }} 
                            onClick = {this.setEditNameTrue}>
                            EDIT
                        </div>
                        <input  
                            id = "profile__nameInput" 
                            className = 'auth__input profile_input' 
                            style = {{"display": this.state.editName ? "block" : "none" }} 
                            placeholder = {"Enter your name"}>
                        </input>
                        <div 
                            className = 'profile_addAddressButton profile_saveButton' 
                            style = {{"display": this.state.editName ? "block" : "none" }} 
                            onClick = {this.saveName}>
                            save
                        </div>
                        <div 
                            className = "auth__input profile_addressNonEdit" 
                            style = {{"display": this.state.editName || this.state.editPhone ? "none" : "block" }}>
                            {this.props.catalog.user.phone ? this.props.catalog.user.phone : "Click edit to enter your phone number"}
                        </div>
                        <div 
                            className = 'profile_addAddressButton profile_saveButton profile_savePhone ' 
                            style = {{"display": !this.state.editPhone && !this.state.editName ? "block" : "none" }} 
                            onClick = {this.setEditPhoneTrue}>
                            EDIT
                        </div>
                        <input
                            pattern="[0-9]*" 
                            id = "profile__phoneInput" 
                            className = 'auth__input profile_input' 
                            style = {{"display": this.state.editPhone ? "block" : "none" }} 
                            onChange = {this.handleInputValue} 
                            placeholder = "Enter your phone">
                        </input>
                        <div 
                            className = {!this.state.editPhone ? 'profile_addAddressButton profile_saveButton profile_savePhone' : 'profile_addAddressButton profile_saveButton' } 
                            style = {{"display": this.state.editPhone ? "block" : "none" }} 
                            onClick = {this.savePhone}>
                            save
                        </div>
                        <div 
                            className = "auth__input profile_addressNonEdit" 
                            style = {{"display": this.state.editName || this.state.editPhone  ? "none" : "block" }}>
                            {this.props.catalog.user.email}
                        </div>
                    </div>
                </div>
            )   
        } else {
            return(
                <div className = { this.props.cartPage !== "true" ? "profileContainer" : "profileContainer , profileContainerCart" }>Error! Something went wrong :(</div>
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

export default connect(mapStateToProps, dispatchStateToProps)(Info);


