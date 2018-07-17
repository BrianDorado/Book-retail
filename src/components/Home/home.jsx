import React, { Component } from 'react';
import Tile from '../BookTiles/tile';
import Image from '../../assets/img/bottle-2022741_960_720.jpg';

class Home extends Component {
  render() {
    return (
      <div className="home-component">
        <h2 className='new-title-header'>Newest Title</h2>
        <div className="new-title">
          <img src={Image} alt="newest-title-cover" className="new-title-img" />
          <div className="new-title-info">
            <h2 className="new-title-title">Book Title</h2>
            <span className="lower-section">
              <p className="new-title-description">
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum."
              </p>
              <button className="user-action-purchase">Buy</button>
            </span>
          </div>
        </div>
        <div className="homepage-breakpoint" />
        <div className="titles-library">
          <h3 className='library-header'>Library</h3>
          {/* To be mapped over axios body response */}
          <Tile title="" image="" description="" price="" />
        </div>
        <div className="homepage-breakpoint" />
        <div>Book and or Author Reviews</div>
      </div>
    );
  }
}

export default Home;
