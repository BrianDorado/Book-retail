import React from "react";
import axios from "axios";

export default class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
  }
  componentDidMount() {
    axios.get("/api/getcart").then(res =>
      this.setState({
        cart: res.data.cart
      })
    );
  }
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
  render() {
    console.log(this.state);
    const { cart, books } = this.state;
    return (
      <div className="cart-component">
        <span className="header-text">
          your cart. <a href="#">sign in</a> to save your purchase history.
        </span>
        <div className="cart-view-container">
          <div className="cart-item-component">
            <h3>{books[0].name}</h3>

            <label>quantity:</label>
            <input
              type="number"
              value={cart.book1qty}
              onChange={evt =>{
                if (evt.target.value < 0 || evt.target.value > 10) return 
                this.setState({
                  cart: Object.assign({}, this.state.cart, { book1qty: evt.target.value })
                })}
              }
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
              onChange={evt =>{
                if (evt.target.value < 0 || evt.target.value > 10) return 
                this.setState({
                  cart: Object.assign({}, this.state.cart, { book2qty: evt.target.value })
                })}
              }
              onBlur={this.handleChangeQty}
            />
            <p>price: ${(cart.book2qty * books[1].price).toFixed(2)}</p>
          </div>

          <section className="checkout-display">
            <p>total: ${this.getTotal()}</p>
          </section>
        </div>
      </div>
    );
  }
}

