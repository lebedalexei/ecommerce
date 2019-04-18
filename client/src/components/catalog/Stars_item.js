import React , {Component} from "react";

class Stars_item extends Component {
    state ={
        starsCount: 0
    }

    calcRating = () =>{
        let avgRating = 0;
        this.props.reviews.forEach(item => {
            avgRating += item.mark/this.props.reviews.length
        })
        const starsCount = Math.floor(avgRating)
        this.setState({starsCount: starsCount})
    }

    componentWillMount(){
        this.calcRating();
    }

    componentDidUpdate(prevProps){
        if(this.props.reviewsCount !== prevProps.reviewsCount){
            this.calcRating();
        }
    }
  
    render(){
        return(
            <div className = 'starsBlock starsBlock_Item'>
                <div className = "starsBlock__stars" onClick = {this.props.reviewsClick}>
                    <img className = 'starItem' src = {this.state.starsCount > 0 ? window.location.origin + '/catalog/staractiveicon' : window.location.origin + '/catalog/starpassiveicon'} alt = '*'></img>
                    <img className = 'starItem' src = {this.state.starsCount > 1 ? window.location.origin + '/catalog/staractiveicon' : window.location.origin + '/catalog/starpassiveicon'} alt = '*'></img>
                    <img className = 'starItem' src = {this.state.starsCount > 2 ? window.location.origin + '/catalog/staractiveicon' : window.location.origin + '/catalog/starpassiveicon'} alt = '*'></img>
                    <img className = 'starItem' src = {this.state.starsCount > 3 ? window.location.origin + '/catalog/staractiveicon' : window.location.origin + '/catalog/starpassiveicon'} alt = '*'></img>
                    <img className = 'starItem' src = {this.state.starsCount > 4 ? window.location.origin + '/catalog/staractiveicon' : window.location.origin + '/catalog/starpassiveicon'} alt = '*'></img>
                </div>
                <div className = "itemStarsBlock_reviews" onClick = {this.props.reviewsClick}>Reviews {this.props.reviewsCount}</div>
            </div>
        );
    }
}

export default Stars_item ;