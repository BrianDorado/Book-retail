import React, { Component } from "react";
import Nav from "./components/nav/Nav";
import routes from "./routes";
import Opacity from "./components/Opacity/Opacity";
import Modal from "./components/Modal/Modal";
import { SomeContext } from "./context/testContext";
import Footer from "./components/Footer/Footer";
import DropdownMenu from "./components/DropdownMenu/dropdownMenu";

class App extends Component {
  constructor() {
    super();
    this.state = {
      modalData: {
        title: '',
        text: '',
        string: '',
        btn1text: '',
        btn1fn: () => {},
        btn2text: '',
        btn2fn: () => {}
      }
    };
  }

  componentDidMount() {
    setTimeout(function() {
      document.body.classList.add("is-mounted");
    }, 800);

    document.body.onscroll = _ => {
      if (document.body.classList.contains("show-modal")) {
        // prevent free scroll when modal open
        window.scrollTo(0, 0);
        const opacity = document.querySelector(".opacity-component");
        const modal = document.querySelector(".modal-component");

        opacity.style.top = window.scrollY + "px";
        modal.style.top = window.scrollY + 200 + "px";
      }
    };

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

  callModal = (title, text, btn1text, btn1fn, btn2text, btn2fn) => {
    // set window.pageYOffset or window.scrollY to the top of opacity and modal + 80
    document.querySelector(".opacity-component").style.top = window.pageYOffset + "px";
    document.querySelector(".modal-component").style.top = window.pageYOffset + 200 + "px";
    this.setState(
      {
        modalData: {
          title, text, btn1text, btn1fn, btn2text, btn2fn
        }
      },
      () => {
        document.body.classList.toggle("show-modal");
      }
    );
  };

  render() {
    const { title, text, btn1text, btn1fn, btn2text, btn2fn } = this.state.modalData
    return (
      <SomeContext.Provider value={this.callModal}>
        <div className="App">
          <Modal title={title} text={text} btn1text={btn1text} btn1fn={btn1fn} btn2text={btn2text} btn2fn={btn2fn} />
          <Opacity />
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
