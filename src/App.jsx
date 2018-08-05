import React, { Component } from 'react';
import Nav from './components/nav/Nav';
import routes from './routes';
import Opacity from './components/Opacity/Opacity';
import axios from 'axios'
import Modal from './components/Modal/Modal';

class App extends Component {

  state={
      modalTitle: '',
      modalText: '',
      mockArray: []
    }
  

  componentDidMount(){
    setTimeout(function(){
      document.body.classList.add('is-mounted')
    },1000*.3)

    axios.get('http://localhost:4044/api/mock/books').then(res => {
      console.log('data req-d');
      this.setState({
        mockArray: res.data 
      })
      console.log('data returned', res.data);
    }) 
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
      <div className="App">
      <Modal title={this.state.modalTitle} text={this.state.modalText}/>
      <Opacity/>
        <Nav/>
        {routes}
        <button onClick={_=>this.callModal('heythere', 'buddy')}>click meh okay</button>
      </div>
    );
  }
}

export default App;
