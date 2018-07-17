import React, { Component } from 'react';
import Nav from './components/nav/Nav';
import routes from './routes';
import Opacity from './components/Opacity/Opacity';
import Modal from './components/Modal/Modal';

class App extends Component {

  componentDidMount(){
    setTimeout(function(){
      document.body.classList.add('is-mounted')
    },1000*.3)
  }
  render() {
    return (
      <div className="App">
      <Modal/>
      <Opacity/>
        <Nav/>
        {routes}
      </div>
    );
  }
}

export default App;
