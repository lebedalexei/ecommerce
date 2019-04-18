import React, {Component} from "react";
import Stars from "./Stars"
import {Link} from 'react-router-dom';

class Item extends Component {

    scrollToTop = () => {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    }

    render(){
        return(
            <Link to = {"/item/" + this.props.id} className = 'itemCatalogView' onClick = {this.scrollToTop}>
                <div className = 'itemCatalogView__photoWrapper'>
                    <img className = "itemCatalogView__photo" src = {window.location.origin + "/catalog/img/" + this.props.imgId} alt = 'img'></img>
                </div>
                <div className = "itemCatalogView__brand">{this.props.brand}</div>
                <div className = "itemCatalogView__title">{this.props.title}</div>
                <div className = "itemCatalogView__price">${this.props.price}</div>
                <Stars reviews = {this.props.reviews} />
            </Link>
        )
    }
}

export default Item;
