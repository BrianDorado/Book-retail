import React from "react";
import axios from "axios";
import Logo from "../../assets/img/blue-book.png";
import Button from "../Button/Button";
import bookList from "./productsList";

const stripePublicKey = process.env.REACT_APP_STRIPE_LIVE_PK;

export default class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      haveToken: false,
      amount: 0,
      email: "",
      cart: { books: [] },
      books: bookList,
    };
  }
  componentDidMount() {
    // configure stripe
    this.waitForStripeScript();
    // get cart
    axios.get("/api/getcart").then(res =>
      this.setState({
        cart: res.data.cart
      })
    );
  }
  waitForStripeScript = () => {
    if (!window.stripeCheckout) {
      setTimeout(_ => {
        if (!window.stripeCheckout) {
          setTimeout(this.configureStripe(), 3000);
        } else this.configureStripe();
      }, 3000);
    } else this.configureStripe();
  };
  configureStripe = () => {
    this.stripeForm = window.StripeCheckout.configure({
      key: stripePublicKey,
      token: this.onToken,
      amount: parseInt(
        String(this.getTotal())
          .split(".")
          .join(""),
        10
      ), // format for $20.00 -> 2000
      currency: "usd",
      locale: "auto",
      zipCode: true,
      name: "Doug Brinley Books",
      description: "Enjoy your purchase!",
      image: Logo,
      shippingAddress: true,
      email: this.state.email
    });
  };
  onToken = (token, shippingInfo) => {
    const { cart } = this.state;
    this.setState({ haveToken: true });
    token.card = void 0;
    const amount = parseInt(
      String(this.getTotal())
        .split(".")
        .join(""),
      10
    );
    const idempotencyKey = this.generateIdempotencyKey();
    axios.post("/api/payment", { token, amount, idempotencyKey, cart }).then(result => {
      // dismiss loading module
      this.props.toggleLoader();
      // call modal
      this.props.openModal({
        modalText: `
          Transaction Complete
          ${"\n"}
          An email receipt will be sent to ${token.email}`,
        modalButtonText1: "OK",
        modalFn1: () => {}
      });
      // clear cart
      this.setState({
        displayLoadingModule: false,
        cart: { books: [] }
      });
    });
    // call loading module
    this.props.toggleLoader();
  };

  generateIdempotencyKey = () => {
    // 12 chars long random key
    const length = 12;
    // Use UTF-16 values between 48 and 122
    const UTFmin = 48,
      UTFmax = 122;

    function genRan() {
      return Math.floor(Math.random() * (UTFmax - UTFmin)) + UTFmin;
    }

    const UTFarr = [];
    for (let i = 0; i < length; i++) {
      UTFarr.push(genRan());
    }
    return String.fromCodePoint(...UTFarr);
  };

  onClickPay = e => {
    e.preventDefault();
    if (this.stripeForm)
    this.stripeForm.open();
    else setTimeout( ()=>{
      if (this.stripeForm)
      this.stripeForm.open();
      else setTimeout(()=>{
        this.stripeForm.open();
      },3000)
    }, 3000)
  };
  handleFocusChange = event => {};
  handleChangeQty = event => {
    axios
      .put("/api/editcart", this.state.cart)
      .then(({ data: cart }) => {
        this.setState({ cart });
      })
      .catch(console.error);
  };
  getTotal = () => {
    const { books: cartBooks } = this.state.cart;
    const { books } = this.state;
    if (!cartBooks) return 0.0;
    return cartBooks.reduce((acc, book) => {
      const { price } = books.find(b => b.id === parseInt(book.id), 10);
      return (parseFloat(acc) + price * book.qty).toFixed(2);
    }, 0);
  };
  componentWillUnmount() {
    if (this.stripeForm)
    this.stripeForm.close();
  }
  updateQty = (id, value) => {
    if (value < 0 || value > 10) return null;
    const index = this.state.cart.books.findIndex(book => {
      return Number(book.id) === id;
    });

    let newBooks = this.state.cart.books.slice();
    newBooks[index].qty = parseInt(value, 10);

    this.setState({
      cart: { books: newBooks }
    });
  };
  removeFromCart = id => {
    axios.delete(`/api/delete/${id}`).then(({ data: cart }) => this.setState({ cart }));
  };
  generateBooksFromCart() {
    let booksFromCart = this.state.books.filter(book => {
      if (!this.state.cart.books) return;
      const index = this.state.cart.books.findIndex(b => parseInt(b.id, 10) === parseInt(book.id, 10));
      if (index === -1) return false;
      return true;
    });
    booksFromCart.forEach((book, index) => {
      book.qty = this.state.cart.books.find(b => Number(b.id) === Number(book.id)).qty;
    });
    return booksFromCart.map(book => (
      <BookDisplay
        key={book.id}
        book={book}
        handleChangeQty={this.handleChangeQty}
        updateQty={this.updateQty}
        removeFromCart={this.removeFromCart}
      />
    ));
  }
  render() {
    const { cart, books } = this.state;
    return (
      <div className="cart-component">
        <div className="cart-view-container">
          {this.generateBooksFromCart()}
          <section className="checkout-display">
            <p>total: ${this.getTotal()}</p>
            <Button fn={this.getTotal() > 0 ? this.onClickPay : _ => alert("Your cart is empty.")} text={"Checkout"} />
          </section>
        </div>
      </div>
    );
  }
}

function BookDisplay({ handleChangeQty, removeFromCart, updateQty, book: { id, name, author, price, qty } }) {
  return (
    <div className="cart-item-component">
      <p className="title">{name}</p>
      <p className="author">{author}</p>
      <p className="price">price: ${(price * qty).toFixed(2)}</p>
      <button onClick={_ => removeFromCart(id)}> remove from cart </button>
      <input
        type="number"
        className="qty"
        value={qty}
        onBlur={handleChangeQty}
        onChange={({ target: { value } }) => updateQty(id, value)}
      />
    </div>
  );
}
