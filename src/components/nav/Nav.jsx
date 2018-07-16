import React from 'react';

export default props => {
  return (
    <div className="nav-component">
      <div className="nav-left" />
      <div className="nav-right">
        <div>
          <span>
            <i className="fas fa-search" /> search
          </span>
          <span>help</span>
          <span>sign in</span>
        </div>
        <div />
      </div>
    </div>
  );
};

// search < i className = "fas fa-search" ></i >
//     <span className='links-list'>
//         <span>item 1</span>
//         <span>item 2</span>
//     </span>
