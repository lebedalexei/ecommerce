import React , {Component}  from "react";
import {Link} from 'react-router-dom';

class AddAddress extends Component {
    render(){
        return(
            <div className = "cart_addInfo">
                <div className = "address__noaddress">You have no saved adresses</div>
                <Link to = "/profile/address" className = "address__button_edit"  id = 'addcontact'>add address</Link>
            </div>
        )
    }
}

export default AddAddress;
