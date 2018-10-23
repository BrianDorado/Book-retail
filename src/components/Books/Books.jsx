import React from "react";
import axios from "axios";
import Button from "../Button/Button";
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
    console.log("state: ", this.state);
    const books = this.state.books.map(book => (
      <BookContainer
        key={book.id}
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
      book: { name, description, author, price, img, reviews }
    } = this.props;
    let reviewsJSX = [];
    if (reviews){
      reviewsJSX.push( <h3> Reviews </h3>)
      for (let i=0; i<reviews.length; i++) {
        const linkName = 'Newswire';
        // possibly incompatible regex: reviews[i].match(/(?<=www\.).*(?=\.)/)[0]
        reviewsJSX.push(
          <a className="review-link" href={reviews[i]} target="_blank"> {linkName} review </a>
        )
    }}
    return (
      <section className="book--container" style={{ whiteSpace: "pre-line" }}>
          <img className="cover-image" alt="cover image" src={require("./../../assets/img/" + img)} />
          <div className="title-author--container">
            <h3>{name}</h3>
            <p className="author">{author}</p>
            <SomeContext.Consumer>
              {({ openModal }) => (
                <Button
                  text={"Add to Cart"}
                  fn={() => {
                    openModal({
                      modalText: 'Add "' + name + '" to cart?',
                      modalButtonText1: "OK",
                      modalButtonText2: "Cancel",
                      modalFn1: this.props.checkoutFn,
                      modalFn2: () => {}
                    });
                  }}
                />
              )}
            </SomeContext.Consumer>
          </div>
          <p className="description" ref={this.description}>
            {this.state.showFullDescription ? description : description.split("\n")[0]}
            <br />
            {description.split("\n").length > 1 && (
              <span className="read-more" onClick={e => this.expand(e.target)}>
                view more
              </span>
            )}
            <br/>
            {reviewsJSX}
          </p>
          <br />
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
