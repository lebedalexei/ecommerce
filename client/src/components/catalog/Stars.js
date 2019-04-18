import React , {Component} from "react";

class Stars extends Component {
    state ={
        starsCount: 0,
        reviews: 0
    }
    calcRating = () =>{
        let avgRating = 0;
        this.props.reviews.forEach(item => {
            avgRating += item.mark/this.props.reviews.length
        })
        const starsCount = Math.floor(avgRating)
        this.setState({starsCount: starsCount, reviews: this.props.reviews.length})
    }

    componentWillMount(){
        this.calcRating();
    }

    componentDidUpdate(prevProps){
        if(this.props.reviews !== prevProps.reviews){
            this.calcRating();
        }
    }
  
    render(){
        return(
            <div className = 'starsBlock'>
                <div className = "starsBlock__stars">
                    <img className = 'itemStar' src = {this.state.starsCount > 0 ? window.location.origin + '/catalog/staractiveicon' : window.location.origin + '/catalog/starpassiveicon'} alt = '*'></img>
                    <img className = 'itemStar'src = {this.state.starsCount > 1 ? window.location.origin + '/catalog/staractiveicon' : window.location.origin + '/catalog/starpassiveicon'} alt = '*'></img>
                    <img className = 'itemStar'src = {this.state.starsCount > 2 ? window.location.origin + '/catalog/staractiveicon' : window.location.origin + '/catalog/starpassiveicon'} alt = '*'></img>
                    <img className = 'itemStar'src = {this.state.starsCount > 3 ? window.location.origin + '/catalog/staractiveicon' : window.location.origin + '/catalog/starpassiveicon'} alt = '*'></img>
                    <img className = 'itemStar'src = {this.state.starsCount > 4 ? window.location.origin + '/catalog/staractiveicon' : window.location.origin + '/catalog/starpassiveicon'} alt = '*'></img>
                </div>
                <div className = "starsBlock_reviews">{this.state.reviews}</div>
            </div>
        );
    }
}

export default Stars;