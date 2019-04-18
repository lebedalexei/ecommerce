import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom';
import * as actionCreators from "../redux/actions";
import {bindActionCreators} from "redux";
import StarsItem from "../components/catalog/Stars_item";
import StarsItemReview from "../components/catalog/Stars_item_review";
import ItemCat from "../components/catalog/Item"

class Item extends Component {

    state = {
        selectedId: this.props.match.params.itemId,
        sizeIsSelected: false,
        selectedSizeId:"",
        data: [],
        error: "",
        displayModal: "none",
        reviews: false,
        browseReviews: true,
        addReview: false,
        popup: false,
        markIsSelected: false,
        textareaErr: false,
        markSelectedErr: false,
        displayMarkModal: false
    }

    loadContent = () =>{
        this.props.getItem("/api/" + this.props.match.params.itemId).then(() =>{
            this.props.getCatalog("/api/catalog/" + this.props.catalog.dataItem[0].category).then(() => {
                const rndArr = this.generateRnd();
                let resultArr = [];
                rndArr.forEach(item =>{
                    resultArr.push(this.props.catalog.data[item])
                })
                this.setState({data: resultArr});
           })
        })
    }

     componentDidMount(){
        this.loadContent();
        this.setState({popup: false})
     }

     componentDidUpdate(prevProps){
         if(this.props.match.params.itemId !== prevProps.match.params.itemId){
            this.loadContent();
            this.setState({selectedSizeId: ""})
         }
     }

     generateRnd = () => {
         let resultArr = []
         for(let i = 0 ; i < 4; i++){
            let a = Math.floor(Math.random()*(this.props.catalog.data.length-1));
            if(resultArr.indexOf(a) === -1){
                resultArr.push(a)
            } else {
                i--;
            }
         }
         return resultArr;
     }


     handleAddToCart = () => {
        if(!this.state.sizeIsSelected){
            this.setState({error : "You must select the size!"})
        } else {
            this.setState({displayModal: "block"})
            const data = {
                item: this.props.catalog.dataItem[0],
                selectedSizeId: this.state.selectedSizeId,
                qty: 1
            }
            this.props.addToCart(data)
            setTimeout(() => {this.props.cartIsChanged(this.props.catalog.cart)} , 100)
            
        }
     }
     
     handleSizeSelected = (e) => {
        this.setState({selectedSizeId: e.target.id, sizeIsSelected: true, error: ""})
     }

     closeModal = () =>{
        this.setState({displayModal: "none"})
     }

     closeReviewModal = () =>{
        this.setState({displayMarkModal: false, addReview: false, reviews: false, browseReviews: true})
        this.loadContent();
        this.closeReviews();
     }

     reviewsClick = () =>{
         document.getElementById('infoBlock__markSelected').innerHTML = "Select mark"
         console.log('clear input')
         this.setState({reviews: true})
     }

    closeReviews = () =>{
        this.setState({addReview: false, reviews: false, browseReviews: true})
    }

    getReviews  = () => {
        this.props.getReviews(this.props.match.params.itemId);
    }

    handleMarksPopup = () => {
        this.setState({popup: !this.state.popup})
    }
    
    chooseMark = (e) => {
        this.setState({popup: false, markIsSelected: true, markSelectedErr: false })
        console.log(e.target.innerHTML);
        document.getElementById('infoBlock__markSelected').innerHTML = e.target.innerHTML;
    }

    checkReviewFields = () => {
        if(this.checkIfMarkIsSelected() && this.checkTextarea()){
            return true
        } else {
            return false;
        };
    }

    checkTextarea = () => {
        if(document.getElementById('addReview__textArea').value.length > 20) {
            this.setState({textareaErr: false})
            return true;
        } else {
            this.setState({textareaErr: true})
        }
    }

    checkIfMarkIsSelected = () => {
        if(!this.state.markIsSelected){
            this.setState({markSelectedErr: true})
            return false
        } else {
            this.setState({markSelectedErr: false})
            return true
        }
    }

    sendReview = () => {
        if(this.checkReviewFields()){
            console.log('mark is set')
            let review = {
                itemId: parseInt(this.props.match.params.itemId),
                mark: parseInt(document.getElementById('infoBlock__markSelected').innerHTML),
                text: document.getElementById('addReview__textArea').value
            }
            console.log(review)
            this.props.addReview(review)
            this.setState({displayMarkModal: true})
            document.getElementById('addReview__textArea').value = '';
            document.getElementById('infoBlock__markSelected').innerHTML = '';
        }
    }

    openAddReview = () => {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        this.setState({addReview: true, reviews: true, browseReviews: false})
    }

    render(){
        if(this.props.catalog.dataItem.length > 0){
            return(
                <div>
                    <div className ='container'>
                        <div className = 'topBlock'>
                            <div className = 'imgBlock'>
                                <div className = "smallImages">
                                    <img className = "item__smallPhoto" src = {window.location.origin + "/catalog/img/" + this.props.catalog.dataItem[0].imgId} alt = 'img'></img>
                                    <img className = "item__smallPhoto" src = {window.location.origin + "/catalog/img/" + this.props.catalog.dataItem[0].imgId} alt = 'img'></img>
                                    <img className = "item__smallPhoto" src = {window.location.origin + "/catalog/img/" + this.props.catalog.dataItem[0].imgId} alt = 'img'></img>
                                </div>
                                <div className = 'bigImage'> <img className = "item__photo" src = {window.location.origin + "/catalog/img/" + this.props.catalog.dataItem[0].imgId} alt = 'img'></img></div>
                            </div>
                            <div className = 'infoBlock'>
                                <div className = 'infoBlock__brand'>{this.props.catalog.dataItem[0].brand}</div>
                                <div className = 'infoBlock__title'>{this.props.catalog.dataItem[0].title}</div>
                                <StarsItem reviewsClick = {this.reviewsClick} reviewsCount = {this.props.catalog.dataItem[0].reviews.length} reviews = {this.props.catalog.dataItem[0].reviews} />
                                <div className = 'infoBlock_mainView' style = {{"display": !this.state.reviews ? "block" : "none"}}>
                                    <div className = 'infoBlock__price'>${this.props.catalog.dataItem[0].price}</div>
                                    <div className = 'imgBlock_mobile'>
                                        <div className = 'bigImage'> <img className = "item__photo" src = {window.location.origin + "/catalog/img/" + this.props.catalog.dataItem[0].imgId} alt = 'img'></img></div>
                                    </div>
                                    <div className = 'infoBlock__sizesWrapper'>
                                        <div className = 'infoBlock__sizesTitle'>Size: Please select</div>
                                        <div className = "infoBlock__sizes">
                                        {this.props.catalog.dataItem[0].sizes.map((item, index) =>(
                                            <div key = {index} 
                                                id = {index} 
                                                className = {parseInt(this.state.selectedSizeId) === index ? 'infoBlock__size_selected' :'infoBlock__size'} 
                                                onClick = {this.handleSizeSelected}>{item}</div>
                                        ))}
                                        </div>
                                    </div>
                                    <div className = 'actionButton' onClick = {this.handleAddToCart}>Add to cart</div>
                                    <div className = 'actionButton_errorMessage'>{this.state.error}</div>
                                    <div className = "infoBlock_detailsWrapper">
                                        <div className = "infoBlock_detailsTitle">Product details</div>
                                        <div className = "infoBlock_details">{this.props.catalog.dataItem[0].details}</div>
                                        <div className = "infoBlock__productFeaturesWrapper">
                                        {this.props.catalog.dataItem[0].productFeatures.map((item, index) =>(
                                            <div   key = {index} className = "infoBlock__productFeatureWrapper">
                                                <div className = 'infoBlock__bullet'></div>
                                                <div className = 'infoBlock__productFeature'>{item}</div>
                                            </div>
                                        ))}
                                        </div>
                                    </div>
                                </div>
                                <div className = 'infoBlock__reviews' style = {{"display": this.state.reviews ? "block" : "none" }}>
                                    <div className = 'infoBlock__addReview' style = {{"display" : this.state.addReview ? "block" : "none"}}>
                                        <textarea className = "addReview__textArea" id = 'addReview__textArea'></textarea>
                                        <div className = 'addReview__textareaErr' style = {{"display" : this.state.textareaErr ? "block" : "none"}}>Review should contain at least 20 symbols</div>
                                        <div className = 'addReview__markResult' onClick = {this.handleMarksPopup}>
                                            <div id = 'infoBlock__markSelected'>Select mark</div>
                                            <img src = '/catalog/polygon' 
                                                id = "addMark_ArrowImg" 
                                                className = {!this.state.popup ? 'addReview__btn' : 'addReview__btn_reverse'} 
                                                alt = 'marks'
                                                onClick = {this.handleMarksPopup}>
                                            </img>
                                            <div className = 'marks_popup' style = {{"display" : this.state.popup ? "block" : "none"}}>
                                                <div className = "infoBlock__markChoise" onClick = {this.chooseMark}>0</div>
                                                <div className = "infoBlock__markChoise" onClick = {this.chooseMark}>1</div>
                                                <div className = "infoBlock__markChoise" onClick = {this.chooseMark}>2</div>
                                                <div className = "infoBlock__markChoise" onClick = {this.chooseMark}>3</div>
                                                <div className = "infoBlock__markChoise" onClick = {this.chooseMark}>4</div>
                                                <div className = "infoBlock__markChoise" onClick = {this.chooseMark}>5</div>
                                            </div>
                                        </div>
                                        <div className = 'addReview__markIsSelectedErr' style = {{"display" : this.state.markSelectedErr ? "block" : "none"}}>Mark should be selected</div>
                                        <div className = 'modal__buttonsWrapper reviews_buttonsWrapper'>
                                            <div className = 'actionButton actionButton_reviews' onClick = {this.sendReview}>add review</div>
                                            <div className = 'modal__continue review__closeButton' onClick = {this.closeReviews}>Close reviews</div>
                                        </div>
                                        <div className = 'modal' style = {{"display" : this.state.displayMarkModal ? "block" : "none"}}>
                                            <div className = 'modal__content'>
                                                    <img className = 'modal__closeModal' src = "/item/closemodal" alt = 'close' onClick = {this.closeReviewModal}></img>
                                                    <div className = "modal__title">You've added a review</div>
                                                    <div className = 'modal__buttonsWrapper'>
                                                        <div className = "modal__continue" onClick = {this.closeReviewModal}>continue shopping</div>
                                                    </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className = "infoBlock__browseReviews" style = {{"display" : this.state.browseReviews ?  "block" : "none"}}>
                                        <div className = "infoBlock__reviewsContent">
                                            {
                                                this.props.catalog.dataItem[0].reviews.length > 0 ? 
                                                <div>
                                                    {this.props.catalog.dataItem[0].reviews.map(item => (
                                                        <div className = 'infoBlock__review'>
                                                            <div className = 'infoBlock__reviewText'>{item.text}</div>
                                                            <div className = 'infoBlock__reviewDataParent'>
                                                                <StarsItemReview  mark = {item.mark}/>
                                                                <div className = 'infoBlock_reveiwDate'>{item.date.split('T')[0]}</div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div> : 
                                                <div className = 'infoBlock__noReveiws'>There is no reviews for this item yet :(</div>
                                            }
                                        </div>
                                        <div className = 'modal__buttonsWrapper reviews_buttonsWrapper'>
                                            <div className = 'actionButton actionButton_reviews' onClick = {this.openAddReview}>add review</div>
                                            <div className = 'modal__continue review__closeButton' onClick = {this.closeReviews}>Close reviews</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className = 'bottomBlock'>
                            <div className = 'bottomBlock_title'>Customers also liked</div>
                            <div className = "bottomBlock_itemsWrapper">
                                {this.state.data.map((item, index) =>(
                                    <ItemCat  key = {index} {...item} />
                                ))}
                            </div>
                        </div>

                    </div>
                    <div className = 'modal' style = {{"display" : this.state.displayModal}}>
                        <div className = 'modal__content'>
                                <img className = 'modal__closeModal' src = "/item/closemodal" alt = 'close' onClick = {this.closeModal}></img>
                                <div className = "modal__title">You've added a product to your cart</div>
                                <div className = 'modal__buttonsWrapper'>
                                    <Link to = "/cart" className = "modal__checkout">view cart</Link>
                                    <div className = "modal__continue" onClick = {this.closeModal}>continue shopping</div>
                                </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return(<div>Loading</div>)
        }
    };
};

const mapStateToProps = (store) =>{
    return({
        catalog: store.catalog,
        newCatalog: store.newCatalog
    })
}

const dispatchStateToProps = (dispatch)=>{
    return bindActionCreators(actionCreators, dispatch)
}

export default connect(mapStateToProps, dispatchStateToProps)(Item);
