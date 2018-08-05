import React from 'react';
import blueBook from '../../assets/img/blue-book.png';
import { Link } from 'react-router-dom';

export default props => {
  return (
    <div className="nav-component">
      <div className="nav-left" >
      
      <img src={blueBook} height="80"/>
      
      <span><span className='highlight'>DB</span>{'\nBOOKS'}</span>
      </div>
      <div className="nav-right">
        <div className="top-of-nav"> {/*first child*/}
          <i className="fas fa-search" /> 
          <span>search</span>
          <span>help</span>
          <span>sign in</span>
        </div> 
        <div className='bottom-of-nav'>  {/*second child*/}
          <div>
              <Link to="/"><span>HOME</span></Link>
              <Link to="/other-stuff"><span>BOOKS</span></Link>
              <Link to="/about"><span>ABOUT</span></Link>
          </div>
          <div>
              <i className="fas fa-shopping-cart"></i> 
              <Link to="/cart"><span>CART</span></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// search < i className = "fas fa-search" ></i >
//     <span className='links-list'>
//         <span>item 1</span>
//         <span>item 2</span>
//     </span>
