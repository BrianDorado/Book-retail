import React from "react";
import axios from "axios";
import Logo from "../../assets/img/blue-book.png";
import Button from "../Button/Button";

const stripePublicKey = process.env.REACT_APP_STRIPE_TEST_PK;

export default class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      haveToken: false,
      amount: 2000,
      email: "",
      cart: [],
      books: [
        {
          name: "Marital Therapy",
          price: 12
        },
        {
          name: "What We Wish We'd Known Before Our Honeymoon",
          price: 12
        }
      ]
    };

    this.stripeForm = window.StripeCheckout.configure({
      key: stripePublicKey,
      token: this.onToken,
      amount: parseInt(
        String(this.getTotal())
          .split(".")
          .join("")
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
  }

  componentDidMount() {
    axios.get("/api/getcart").then(res =>
      this.setState({
        cart: res.data.cart
      })
    );
  }
  onToken = (token, shippingInfo) => {
    console.log('shipping info: ', shippingInfo)
    const { cart } = this.state
    console.log("Stripe Token", token);
    this.setState({ haveToken: true });
    token.card = void 0;
    const amount = parseInt(
      String(this.getTotal())
        .split(".")
        .join("")
    );
    const idempotencyKey = this.generateIdempotencyKey();
    axios
      .post("/api/payment", { token, amount, idempotencyKey, cart })
      .then(result => {
        // call modal
        this.props.callModal('Transaction Complete', `
          You're order was completed.
          An email receipt will be sent to ${token.email}.
        
        `, 'OK', _=>document.body.classList.toggle('show-modal'))
        // clear cart
        this.setState({
          cart: {
            book1qty: 0,
            book2qty: 0
          }
        })
      });
  };

  generateIdempotencyKey = () => {
    // 12 chars long random key
    const length = 12;
    // Use UTF-16 values between 48 and 122
    const UTFmin = 48, UTFmax = 122;

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
    this.stripeForm.open();
  };
  handleFocusChange = event => {
    console.log(event.target);
  };
  handleChangeQty = event => {
    axios
      .put("/api/editcart", this.state.cart)
      .then(({ data: cart }) => {
        this.setState({ cart });
      })
      .catch(console.error);
  };
  getTotal = () => {
    const { book1qty, book2qty } = this.state.cart;
    const { books } = this.state;
    return (book1qty * books[0].price + book2qty * books[1].price).toFixed(2);
  };
  componentWillUnmount() {
    this.stripeForm.close();
  }
  render() {
    console.log(this.props)
    const { cart, books } = this.state;
    return (
      <div className="cart-component">
        <div className="cart-view-container">
          <div className="cart-item-component">
            <h3>{books[0].name}</h3>

            <label>quantity:</label>
            <input
              type="number"
              value={cart.book1qty}
              onChange={evt => {
                if (evt.target.value < 0 || evt.target.value > 10) return;
                this.setState({
                  cart: Object.assign({}, this.state.cart, { book1qty: evt.target.value })
                });
              }}
              onBlur={this.handleChangeQty}
            />
            <p>price: ${(cart.book1qty * books[0].price).toFixed(2)}</p>
          </div>

          <div className="cart-item-component">
            <h3>{books[1].name}</h3>

            <label>quantity:</label>
            <input
              type="number"
              value={cart.book2qty}
              onChange={evt => {
                if (evt.target.value < 0 || evt.target.value > 10) return;
                this.setState({
                  cart: Object.assign({}, this.state.cart, { book2qty: evt.target.value })
                });
              }}
              onBlur={this.handleChangeQty}
            />
            <p>price: ${(cart.book2qty * books[1].price).toFixed(2)}</p>
          </div>

          <section className="checkout-display">
            <p>total: ${this.getTotal()}</p>
            <Button fn={this.getTotal() > 0 ? this.onClickPay: _=>alert('Your cart is empty.')} text={"Checkout"} />
          </section>
        </div>
      </div>
    );
  }
}
