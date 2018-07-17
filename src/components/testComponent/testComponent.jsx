import React from 'react'
import Cover from '../../assets/img/generic-cover.jpg';

function BookThumbnail(props){
    // this component will take in props based on the books array coming from the DB
    // currently is just rendering 6 placeholders
    function addToCart() {
        document.body.classList.toggle('show-modal');
    }
    return (
        <div className="book-thumbnail">
                <img src={Cover}/>
                <div className="left-side">
                    <div className="book-title">Book Title</div> 
                    <div className="author-name"><em>by</em> Author Name</div>
                    <div className="buy-button" onClick={addToCart}>BUY</div>
                </div>
            
            </div>
    )
}

export default props => {
    
    let thumbnailArray = []
    for (let i=0; i<6; i++){
        thumbnailArray.push(<BookThumbnail/>)
    }
 
    return (
    <div className="test-component">
        <div className="grid-container">
            {thumbnailArray}
        </div>
    </div>
    )
}