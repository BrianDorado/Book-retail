import React, { Component } from 'react';
import Nav from './components/nav/Nav';
import routes from './routes';
import Opacity from './components/Opacity/Opacity';
import Modal from './components/Modal/Modal';
import { SomeContext } from './context/testContext';


class App extends Component {

  constructor(){
    super()
    this.state={
      modalTitle: '',
      modalText: ''
    }
  }

  componentDidMount(){
    setTimeout(function(){
      document.body.classList.add('is-mounted')
    },1000*.3)
  }
  
  callModal = (title, text) => {
    this.setState({
      modalTitle: title,
      modalText: text
    }, ()=>{
      document.body.classList.toggle('show-modal')
    })
  }
  render() {
    return (
      <SomeContext.Provider value={text=>this.callModal(text, 'api')

      }>
      <div className="App">
      <Modal title={this.state.modalTitle} text={this.state.modalText}/>
      <Opacity/>
        <Nav/>
        {routes}
      </div>
      </SomeContext.Provider>
    );
  }
}

export default App;
