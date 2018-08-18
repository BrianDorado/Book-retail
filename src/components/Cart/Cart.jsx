import React from 'react';
import axios from 'axios';
import Logo from '../../assets/img/blue-book.png';

const stripePublicKey = process.env.REACT_APP_STRIPE_PUBLIC_KEY;

export default class Cart extends React.Component {
  state = {
    haveToken: false,
    amount: 0
  };

  stripeForm = window.StripeCheckout.configure({
    key: stripePublicKey,
    token: this.onToken,
    amount: this.state.amount,
    currency: 'usd',
    locale: 'auto',
    zipcode: true,
    name: 'Please Enjoy your purchase!',
    description: 'Doug Brinley Books',
    image: Logo
  });

  create_order = (id, qty, total) => {
    let new_Order = {
      book_id: id,
      qty: qty,
      price_total: total
    };
    axios.post('/api/create/order', new_Order);
  };

  onToken = token => {
    token.card = void 0;

    const amount = this.state;

    axios.post('/api/payment', { token, amount }).then(res => {});
  };

  onClickPay = e => {
    e.preventDefault();
    this.stripeForm.open();
  };

  render() {
      let buttonLabel = this.state.haveToken ? 'Thank you!' : `Pay $${(this.state.amount/100).toFixed(2) }`
    return (
      <div className="cart-component">
        <span className="header-text">
          your cart. <a href="#">sign in</a> to save your purchase history.
        </span>
        <div className="cart-view-container">I am the cart container</div>
        <form onSubmit={this.handleCheckout}>
        <button
          className={this.state.haveToken ? 'stripeButton-disabled' : 'stipeButton'}
          onClick={this.state.haveToken ? null : this.onClickPay}
          >
          Checkout
        </button>
          </form>
      </div>
    );
  }
  componentWillMount() {
    this.stripeForm.close();
  }
}
