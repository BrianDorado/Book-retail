import React, { Component } from 'react';
import Nav from './components/nav/Nav';
import routes from './routes';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav/>
        {routes}
      </div>
    );
  }
}

export default App;
