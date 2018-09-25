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
      amount: 0,
      email: "",
      cart: { books: [] },
      books: [
        {
          id: 0,
          name: "Marital Therapy",
          author: "Douglas E. Brinley",
          price: 12
        },
        {
          id: 1,
          name: "What We Wish We'd Known Before Our Honeymoon",
          author: "Douglas E. Brinley",
          price: 12
        },
        {
          id: 2,
          name: "The Snowman Who Saw Christmas",
          author: "Geri Brinley",
          price: 12
        },
        {
          id: 3,
          name: "America in Peril: Ten Stages in the Destruction of a Promised Land",
          author: "Douglas E. Brinley",
          price: 12
        },
        {
          id: 4,
          name: "SINGLE in a Married Church",
          author: "Douglas E. Brinley and Anne Woelkers",
          price: 12
        },
        {
          id: 5,
          name: 'Marital "Tune-up Kit"',
          author: "Doug Brinley and Dave Brinley",
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
    // get cart
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
          cart: { books: [] }
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
    const { books: cartBooks } = this.state.cart;
    const { books } = this.state;
    
    return cartBooks.reduce( (acc, book) => {
      return acc + books.find(b=>b.id===Number(book.id)).price
    }, 0).toFixed(2);
  };
  componentWillUnmount() {
    this.stripeForm.close();
  }
  updateQty = (id, value) => {
    if (value < 0 || value > 10) return;
    // update qty on state with evt.target.value
    // update qty for book with matching id to value
    // this.state.cart.books[{id: number, qty: number}]
    // find matching index
    
    const index = this.state.cart.books.findIndex(book=>{
      return Number(book.id) === id;
    })

    let newBooks = this.state.cart.books.slice();
    newBooks[index].qty = value

    this.setState({
      cart: {
        books: newBooks
      }
    })
  }
  generateBooksFromCart() {
    let booksFromCart = this.state.books.filter( book => this.state.cart.books.findIndex(b=>Number(b.id)===Number(book.id)) !== -1)
    booksFromCart.forEach((book, index)=>{
      book.qty = this.state.cart.books.find(b=>Number(b.id)===Number(book.id)).qty
    })
    console.log('books from cart: ', booksFromCart)
    return booksFromCart.map( book => (
      <BookDisplay book={book} handleChangeQty={this.handleChangeQty} updateQty={this.updateQty}/>
    ))
  }
  render() {
    const { cart, books } = this.state;
    return (
      <div className="cart-component">
        <div className="cart-view-container">
        { this.generateBooksFromCart() }
          {/* <div className="cart-item-component">
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
          </div> */}

          <section className="checkout-display">
            <p>total: ${this.getTotal()}</p>
            <Button fn={this.getTotal() > 0 ? this.onClickPay: _=>alert('Your cart is empty.')} text={"Checkout"} />
          </section>
        </div>
      </div>
    );
  }
}


function BookDisplay ({handleChangeQty, updateQty, book: {id, name, author, price, qty}}) {
  return(
    <div className="cart-item-component">
      <p className="title">{ name }</p>
      <p className="author">{ author }</p> 
      <p className="price">price: ${ price.toFixed(2) }</p>
      <input type="number" className="qty" value={qty}
      onBlur={handleChangeQty}
      onChange={({target: {value}})=>updateQty(id, value)}
      ></input>
    </div>
  )
}