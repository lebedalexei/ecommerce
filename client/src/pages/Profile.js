import React, {Component} from "react"
import {Redirect, Link} from 'react-router-dom';
import {connect} from 'react-redux'
import * as actionCreators from "../redux/actions";
import {bindActionCreators} from "redux";
import ProfileMenuItem from "../components/profile/ProfileMenuItem";import {BrowserRouter as Router, Route} from "react-router-dom";
import Info from "../components/profile/Info"
import Address from "../components/profile/Address"
import Orders from "../components/profile/Orders"

class Profile extends Component {

    state = {
        dataLoaded: false,
        data: {},
        logout: false,
        initials: "",
        mobMenu: "contact"
    }

    handleLogout = () => {
        this.props.logout()
        this.setState({logout: true})
    }


    getInitials = () =>{
        if(this.props.catalog.user.name){
            let userName = this.props.catalog.user.name.split(" ");
            let firstLetter = userName[0].split("")[0];
            let secondLetter = "";
            if(userName.length > 1){
                secondLetter = userName[1].split("")[0];
            } 
            let initials = firstLetter + (secondLetter ? secondLetter : "");
            return initials;
        } else {
            return "";
        }
    }

    componentWillMount(){
        this.props.loadUser().then((res) =>{
            let initials = this.getInitials();
            this.setState({dataLoaded: true, data: res.value.data, initials: initials})
        })
    }

    componentDidUpdate(prevProps){
        if(this.props.catalog.user.name !== prevProps.catalog.user.name){
            this.setState({initials: this.getInitials()})
            console.log(window.location.pathname)
        }
    }

    saveAddress = () =>{
        const address = document.getElementById('address').value;
        this.props.changeAddress(address);
    }

    changeStateToContact = () => {
        this.setState({ mobMenu: "contact"})
    }

    changeStateToAddress = () => {
        this.setState({ mobMenu: "address"})
    }

    changeStateToOrders = () => {
        this.setState({ mobMenu: "orders"})
    }


    render(){
        if(this.state.logout){
            return <Redirect to = "/" />
        } else {
            if(!this.state.dataLoaded){
                return(
                    <div className = 'container'>Profile is loading</div>
                );
            } else {
                if(this.state.data === 'nouser'){
                    return <Redirect to = "/auth" />
                } else {
                    return(
                        <Router>
                            <div className = 'container'>
                                <div className ='cartTitle'>Profile</div>
                                <div className = 'profile_contentWrapper'>
                                    <div className = "profile__menu">
                                        <div className = 'profile__menu__nameWrapper'>
                                            <div className = 'profile__menu__initials'>{this.state.initials ?  this.state.initials : "UN"}</div>
                                            <div className = 'profile__menu__dataWrapper'>
                                                <div className = 'profile__menu__hi'>Hi,</div>
                                                <div className = 'profile__menu__name'>{this.props.catalog.user.name}</div>
                                                <div className = 'profile__menu__logout' onClick = {this.handleLogout}>logout</div>
                                            </div>
                                        </div>
                                        <div className = "profileNavbar_desktop">
                                            <ProfileMenuItem className = {window.location.pathname === "/profile/info" ? 'profile__menu__element_active' : 'profile__menu__element'} item = "Contact info" />
                                            <ProfileMenuItem className = {window.location.pathname === "/profile/address" ? 'profile__menu__element_active' : 'profile__menu__element'} item = "Shipping address" />
                                            <ProfileMenuItem className = {window.location.pathname === "/profile/orders" ? 'profile__menu__element_active' : 'profile__menu__element'}item = "Orders" />
                                        </div>
                                        <div className = "profileNavbar_mob">
                                            <Link to = '/profile/contact' onClick = {this.changeStateToContact} className = {window.location.pathname === "/profile/contact" ? 'profile__mobMenu__element_active' : 'profile__mobMenu__element'}>Info</Link>
                                            <Link to = '/profile/address'onClick = {this.changeStateToAddress} className = {window.location.pathname === "/profile/address" ? 'profile__mobMenu__element_active' : 'profile__mobMenu__element'}>Address</Link>
                                            <Link to = '/profile/orders'onClick = {this.changeStateToOrders} className = {window.location.pathname === "/profile/orders" ? 'profile__mobMenu__element_active' : 'profile__mobMenu__element'}>Orders</Link>
                                        </div>
                                    </div>
                                    <div className = "profile__content">
                                        <Route exact path = "/profile/" component = {Info} />    
                                        <Route exact path = "/profile/contact" component = {Info} />
                                        <Route exact path = "/profile/address" component = {Address} />
                                        <Route exact path = "/profile/orders" component = {Orders} />
                                    </div>
                                </div>
                            </div>
                        </Router>
                    );
                }
            }
        }
    }
}

const mapStateToProps = (store) =>{
    return({
        catalog: store.catalog,
        newCatalog: store.newCatalog
    })
}

const dispatchStateToProps = (dispatch)=>{
    return bindActionCreators(actionCreators, dispatch)
}

export default connect(mapStateToProps, dispatchStateToProps)(Profile);


