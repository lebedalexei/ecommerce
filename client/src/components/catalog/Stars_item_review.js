import React , {Component} from "react";

class Stars_item_review extends Component {
    state = {
        starsCount: 0
    }

    calcRating = () =>{
        const starsCount = Math.floor(this.props.mark)
        this.setState({starsCount: starsCount})
    }

    componentWillMount(){
        this.calcRating();
    }

    componentDidUpdate(prevProps){
        if(this.props.mark !== prevProps.mark){
            this.calcRating();
        }
    }
  
    render(){
        return(
            <div className = 'starsBlock starsBlock_Review'>
                <div className = "starsBlock__stars" onClick = {this.props.reviewsClick}>
                    <img className = 'starItem' src = {this.state.starsCount > 0 ? window.location.origin + '/catalog/staractiveicon' : window.location.origin + '/catalog/starpassiveicon'} alt = '*'></img>
                    <img className = 'starItem' src = {this.state.starsCount > 1 ? window.location.origin + '/catalog/staractiveicon' : window.location.origin + '/catalog/starpassiveicon'} alt = '*'></img>
                    <img className = 'starItem' src = {this.state.starsCount > 2 ? window.location.origin + '/catalog/staractiveicon' : window.location.origin + '/catalog/starpassiveicon'} alt = '*'></img>
                    <img className = 'starItem' src = {this.state.starsCount > 3 ? window.location.origin + '/catalog/staractiveicon' : window.location.origin + '/catalog/starpassiveicon'} alt = '*'></img>
                    <img className = 'starItem' src = {this.state.starsCount > 4 ? window.location.origin + '/catalog/staractiveicon' : window.location.origin + '/catalog/starpassiveicon'} alt = '*'></img>
                </div>
            </div>
        );
    }
}

export default Stars_item_review ;