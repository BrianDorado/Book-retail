import React, { Component } from 'react';
import Nav from './components/nav/Nav';
import Home from './components/Home/home'
import routes from './routes';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav/>
        <Home/>
        {routes}
      </div>
    );
  }
}

export default App;

