import React, { Component } from "react";
import Nav from "./components/nav/Nav";
import routes from "./routes";
import { SomeContext } from "./context/testContext";
import Footer from "./components/Footer/Footer";
import DropdownMenu from "./components/DropdownMenu/dropdownMenu";
import Modal from 'react-modal';
import Button from './components/Button/Button';

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
        modalFn1: ()=>{console.log('modal fn 1')},
        modalFn2: ()=>{console.log('modal fn 2')},
        modalBtnText1: 'OK',
        modalBtnText2: 'Cancel'
      }
    };
  }

  openModal = ( modalConfig )=> {
    this.setState({
      modalOpen: true,
      modalConfig
    })
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

    // document.body.onscroll = _ => {
    //   if (document.body.classList.contains("show-modal")) {
    //     // prevent free scroll when modal open
    //     window.scrollTo(0, 0);
    //     const opacity = document.querySelector(".opacity-component");
    //     const modal = document.querySelector(".modal-component");

    //     opacity.style.top = window.scrollY + "px";
    //     modal.style.top = window.scrollY + 200 + "px";
    //   }
    // };

    //   document.body.onscroll =  e=>{
    //     const Y = window.scrollY
    //     console.log('scrooll effc')
    //     if(document.body.classList.contains('show-modal')){
    //       console.log('scroll eve', e)
    //       window.scrollTo( 0, Y )
    //       console.log('_-scroll effect-__')

    //     }
    //   }

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

  // callModal = (title, text, btn1text, btn1fn, btn2text, btn2fn) => {
  //   // set window.pageYOffset or window.scrollY to the top of opacity and modal + 80
  //   document.querySelector(".opacity-component").style.top = window.pageYOffset + "px";
  //   document.querySelector(".modal-component").style.top = window.pageYOffset + 200 + "px";
  //   this.setState(
  //     {
  //       modalData: {
  //         title, text, btn1text, btn1fn, btn2text, btn2fn
  //       }
  //     },
  //     () => {
  //       document.body.classList.toggle("show-modal");
  //     }
  //   );
  // };

  render() {
    const { modalConfig: { modalText, modalFn1, modalFn2, modalButtonText1, modalButtonText2 } } = this.state;
    return (
      <SomeContext.Provider value={this.openModal}>
        <div className="App">
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
