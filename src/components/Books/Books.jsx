import React from "react";
import axios from "axios";
import Button from "../Button/Button";
import marriageBand from "../../assets/img/marriage-band-1920-1080.jpg";
import brideGroom from "../../assets/img/bride-groom1620-1080.jpg";
import { SomeContext } from "../../context/testContext";
import PropTypes from "prop-types";

export default class Books extends React.Component {
  state = { books: [] };
  componentDidMount() {
    // get book list from server
    axios.get("/api/products/books").then(({ data: books }) => this.setState({ books }));
    // hide scrollbars
    // const textContainers = document.querySelectorAll(".text-container");
    // // offsetWidth - clientWidth to determine size of scrollbar
    // const scrollbarOffset = textContainers[0].offsetWidth - textContainers[0].clientWidth;
    // textContainers[0].style.right = "-" + scrollbarOffset + "px";
    // textContainers[1].style.right = "-" + scrollbarOffset + "px";
    // textContainers[0].style.position = "relative";
    // textContainers[1].style.position = "relative";
    // const textContainerWrappers = document.querySelectorAll(".text-container-wrapper");
    // textContainerWrappers[0].style.marginLeft = "auto";
    // textContainerWrappers[1].style.marginLeft = "-" + scrollbarOffset + "px";

    // const bgImg1 = new Image();
    // const bgImg2 = new Image();
    // bgImg1.src = marriageBand;
    // bgImg2.src = brideGroom;

    // let bg1Loaded = false;
    // let bg2Loaded = false;
    // console.time("book-imgs-load");
    // bgImg1.onload = function() {
    //   bg1Loaded = true;
    //   if (bg2Loaded) {
    //     console.timeEnd("book-imgs-load");
    //     firstLoadDelay(1200);
    //   }
    // };
    // bgImg2.onload = function() {
    //   bg2Loaded = true;
    //   if (bg1Loaded) {
    //     console.timeEnd("book-imgs-load");
    //     firstLoadDelay(1200);
    //   }
    // };
    firstLoadDelay(1200);
    // const bgImageElements = document.querySelectorAll(".bg-image");
    // bgImageElements[0].style.backgroundImage = "url(" + bgImg1 + ")";
    // console.log(' bg 2 ', bgImg2)
    // bgImageElements[1].style.backgroundImage = "url(" + bgImg2 + ")";

    function firstLoadDelay(delay) {
      if (document.body.classList.contains("is-mounted")) {
        fadeInComponent();
      } else setTimeout(fadeInComponent, delay);
    }
    function fadeInComponent() {
      let component = document.querySelector(".books-component");
      if (component) component.classList.add("fadein");
    }
  }

  addItemToCart = bookId => {
    axios
      .put("/api/addtocart/" + bookId)
      .then(_ => document.body.classList.toggle("show-modal"))
      .catch(console.error);
  };
  render() {
    console.log(`books state:`, this.state);
    const books = this.state.books.map(book => (
      <BookContainer
        book={book}
        checkoutFn={() => {
          this.addItemToCart(book.id);
        }}
      />
    ));
    return <div className="books-component">{books}</div>;
  }
}

// function BookDisplay(props) {
//   const addToCart = id => {
//     console.log("added to cart");
//   };
//   return (
//     <section>
//       <div className="bg-image" />
//       <div className="book-section-container">
//         <div
//           className="text-container-wrapper"
//           style={{
//             width: "550px",
//             overflow: "hidden",
//             height: "100%",
//             position: "relative",
//             display: "flex",
//             alignItems: "center"
//           }}
//         >
//           <div className="text-container">
//             <h1>{props.title}</h1>
//             <SomeContext.Consumer>
//               {fn => (
//                 <Button
//                   fn={_ =>
//                     fn(
//                       "Add to Cart",
//                       `this will add ${props.title} to your cart.`,
//                       "CONFIRM",
//                       props.checkoutFn,
//                       "CANCEL",
//                       _ => document.body.classList.toggle("show-modal")
//                     )
//                   }
//                   text="add to cart"
//                 />
//               )}
//             </SomeContext.Consumer>
//             {props.text}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

class BookContainer extends React.Component {
  constructor(props) {
    super(props);
    this.description = React.createRef();
    this.state = { showFullDescription: false };
  }

  expand = e => {
    this.setState(prevState => ({
      showFullDescription: !prevState.showFullDescription
    }));
    e.textContent = e.textContent === "view more" ? "view less" : "view more";
  };
  render() {
    console.log(this.state);
    let {
      checkoutFn,
      book: { name, description, author, price }
    } = this.props;
    return (
      <section className="book--container" style={{ whiteSpace: "pre-line" }}>
        <h3>{name}</h3>
        <p className="author">{author}</p>
        <hr />
        <p className="description" ref={this.description}>
          {this.state.showFullDescription ? description : description.split("\n")[0]}
          <br />
          {description.split("\n").length > 1 && (
            <span className="read-more" onClick={e => this.expand(e.target)}>
              view more
            </span>
          )}
        </p>
        <hr />
        <br />
        <SomeContext.Consumer>
          {openModal => (
            <Button
              text={"Add to Cart"}
              fn={() => {
                openModal({
                  modalText: name, 
                  modalButtonText1: "OK",
                  modalButtonText2: "Cancel",
                  modalFn1: this.props.checkoutFn,
                  modalFn2: () => {}
                });
              }}
            />
          )}
        </SomeContext.Consumer>
      </section>
    );
  }
}

BookContainer.propTypes = {
  checkoutFn: PropTypes.func.isRequired,
  book: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
  })
};
