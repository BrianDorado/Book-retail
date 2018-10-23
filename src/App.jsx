import React, { Component } from "react";
import Nav from "./components/nav/Nav";
import routes from "./routes";
import { SomeContext } from "./context/testContext";
import Footer from "./components/Footer/Footer";
import DropdownMenu from "./components/DropdownMenu/dropdownMenu";
import Modal from 'react-modal';
import Button from './components/Button/Button';
import { FadeLoader } from 'react-spinners';
import './arrayFromPolyfill';
import './arrayFindIndexPolyfill';
import './arrayFindPolyfill';

const modalStyles = {
  content : {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
}

Modal.setAppElement('#root')

class App extends Component {
  constructor() {
    super();
    this.state = {
      modalOpen: false,
      modalConfig: {
        modalText: '', 
        modalFn1: ()=>{return 0;},
        modalFn2: ()=>{return 0;},
        modalBtnText1: 'OK',
        modalBtnText2: 'Cancel'
      },
      displayLoader: false
    };
  }

  openModal = ( modalConfig )=> {
    this.setState({
      modalOpen: true,
      modalConfig
    })
  }
  toggleLoader = () => {
    this.setState({ displayLoader: !this.state.displayLoader});
    document.body.classList.toggle("displayLoader")
    const loader = document.querySelector('.loader--container')
    if (loader) {  
      loader.style.left = window.pageXOffset + "px";
      loader.style.top = window.pageYOffset + "px";
    }
  }
  afterOpenModal = () => {
    // this.subtitle.style.color = 'red';
  }
  closeModal = () => {
    this.setState({ modalOpen: false })
  }
  componentDidMount() {
    setTimeout(function() {
      document.body.classList.add("is-mounted");
    }, 800);

    // add functionality to hamburger menu
    const hamburgerIcon = document.querySelector("#hamburger-icon");
    const dropdown = document.querySelector("#drop-down-menu");
    hamburgerIcon.onclick = _ => {
      dropdown.classList.toggle("grow");
      hamburgerIcon.classList.toggle("icon-clicked");
    };
    Array.from(dropdown.children).forEach(el => {
      el.onclick = _ => {
        dropdown.classList.toggle("grow");
        hamburgerIcon.classList.toggle("icon-clicked");
      };
    });
  }

  render() {
    const { modalConfig: { modalText, modalFn1, modalFn2, modalButtonText1, modalButtonText2 } } = this.state;
    return (
      <SomeContext.Provider value={{
        openModal: this.openModal,
        toggleLoader: this.toggleLoader
        }}>
        <div className="App">
        {
          this.state.displayLoader ? 
          <div className="loader--container">
            <FadeLoader
              sizeUnit={"px"}
              size={200}
              color={'#395C6B'}
              loading={true}
            />
          </div> :
          null
        }
        <Modal
          isOpen={this.state.modalOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={modalStyles}
          contentLabel="Confirmation Modal"
        >
        {/* <h2 ref={subtitle => this.subtitle = subtitle}>Confirm</h2> */}
        <p>{ modalText }</p>
        <br/>

        {modalButtonText1 && <Button fn={()=>{
          modalFn1();
          this.closeModal();
        }} text={ modalButtonText1 }/>}
        {modalButtonText2 && <Button fn={()=>{
          modalFn2();
          this.closeModal();
        }} text={ modalButtonText2 }/>}
        
      </Modal>
          <Nav />
          <DropdownMenu /> {/* <-- this is the drop down menu */}
          {routes}
          <Footer />
        </div>
      </SomeContext.Provider>
    );
  }
}

export default App;
