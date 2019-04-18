import React , {Component}  from "react";
import {connect} from 'react-redux'
import * as actionCreators from "../../redux/actions";
import {bindActionCreators} from "redux";

class QtyCounter extends Component {

    componentDidMount(){
        document.getElementById(this.props.index + "/input").value = this.props.catalog.cart[this.props.index].qty
    }
    componentDidUpdate(){
        document.getElementById(this.props.index + "/input").value = this.props.catalog.cart[this.props.index].qty
    }

    render(){
        return(
            <div className = 'cartItemQty'>
                <div className = 'cartItem_decrement' id = {this.props.index} onClick = {this.props.decrementCartP}>-</div>
                <input  id = {this.props.index + "/input"} className = 'cartItem_qty' onChange = {this.props.changeCartP}></input>
                <div className = 'cartItem_increment'id = {this.props.index} onClick = {this.props.incrementCartP}>+</div>
            </div>
        )
    }
}
const mapStateToProps = (store) =>{
    return({
        catalog: store.catalog
    })
}

const dispatchStateToProps = (dispatch) => {
    return bindActionCreators(actionCreators, dispatch)
}

export default connect(mapStateToProps, dispatchStateToProps)(QtyCounter);





