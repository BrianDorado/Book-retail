import React from 'react';

export default props => {
  return (
    <div className="nav-component">
      <div className="nav-left" >left side babytyyy</div>
      <div className="nav-right">
        <div className="top-of-nav"> {/*first child*/}
          <i className="fas fa-search" /> 
          <span>search</span>
          <span>help</span>
          <span>sign in</span>
        </div> 
        <div className='bottom-of-nav'>  {/*second child*/}
          <div>
              <span>SHOP</span>
              <span>BLOG</span>
              <span>ABOUT</span>
          </div>
          <div>
              <i className="fas fa-shopping-cart"></i> 
              <span>CART</span>
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
