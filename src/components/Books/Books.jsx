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
    firstLoadDelay(1200);

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
    const books = this.state.books.map(book => (
      <BookContainer
        book={book}
        checkoutFn={() => {
          this.addItemToCart(Number(book.id));
        }}
      />
    ));
    return <div className="books-component">{books}</div>;
  }
}

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
          { ({openModal}) => (
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
