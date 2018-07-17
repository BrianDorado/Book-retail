import React, { Component } from 'react';
import Nav from './components/nav/Nav';
import routes from './routes';

class App extends Component {

  componentDidMount(){
    setTimeout(function(){
      document.body.classList.add('is-mounted')
    },1000*.3)
  }
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
