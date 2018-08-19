import React from 'react';
import blueBook from '../../assets/img/blue-book.png';
import { Link } from 'react-router-dom';
import {SomeContext} from '../../context/testContext';
import HamburgerMenu from '../HamburgerMenu/HamburgerMenu';

export default props => {
  return (
    <div className="nav-component">
      {/* white section with logo */}
      <div className="nav-left" >
      <div>
        <svg id="book-svg" xmlns="http://www.w3.org/2000/svg" width="74" height="74" viewBox="0 0 74 74">
        <g transform="scale(.14)">
        <path d="M480 256v256H224c-35.344 0-64-28.656-64-64V224c0-35.344 28.656-64 64-64h224v64h-32v-32H224c-17.672 0-32 14.313-32 32s14.328 32 32 32h256zm-352-32c0-52.938 43.063-96 96-96h128V96H96c-17.672 0-32-14.313-32-32s14.328-32 32-32h192v32h32V0H96C60.656 0 32 28.656 32 64v224c0 35.344 28.656 64 64 64h32V224z"/>
        </g>
        </svg>
      </div>
      <span><div className='highlight'>Doug<br/>Brinley </div>{'\nBooks'}</span>
      </div>
      {/* blue nav bar section */}
      <div className="nav-right">
        {/* put hamburger menu here */}
        <HamburgerMenu/>
        <div className="top-of-nav"> {/*first child*/}
          <i className="fas fa-search" /> 
          <span>search</span>
          <Link to="/contact"><span>contact</span></Link>
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
