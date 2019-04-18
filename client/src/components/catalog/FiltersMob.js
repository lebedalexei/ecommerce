import React, {Component} from "react";
import {connect} from 'react-redux'
import * as actionCreators from "../../redux/actions";
import {bindActionCreators} from "redux";

class FiltersMob extends Component{

    incrementPage = () => {
       document.body.scrollTop = document.documentElement.scrollTop = 0;
       this.props.increment()
    };

    decrementPage = () => {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        this.props.decrement()
     };

    render(){
        return(
            <div className = 'filtersMob'>
                <div className = 'filtersMob__info'>
                    <div className = 'filtersRight__pageTitle'>Page</div>
                    <div className = 'filtersRight__currentPageNumber'>{this.props.catalog.currentPage}</div>
                    <div className = 'filtersRight__pageTitle'> of </div>
                    <div className = 'filtersRight__pagesNumber'>{this.props.catalog.pages}</div>
                </div>
                <div className = 'filtersMob__buttons'>
                    <div className = 'actionButton mobFilterbutton' onClick = {this.decrementPage}>Previous page</div>
                    <div className = 'actionButton mobFilterbutton' onClick = {this.incrementPage}>next page</div>
                </div>
            </div>
        );
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

export default connect(mapStateToProps, dispatchStateToProps)(FiltersMob);

