const books = require('./bookList');

module.exports = {
  getAllBooks: (req, res) => {
    res.status(200).send(books);
  },
  addToCart: (req, res) => {
    const { cart } = req.session.user;
    const { bookId } = req.params;

    
    // if (bookId == 1) cart.book1qty++;
    // if (bookId == 2) cart.book2qty++;

    // check if book in cart
    let index = cart.books.findIndex( book => Number(book.id) === Number(bookId))

    console.log('index: ', index)
    // if not in cart, add new record 
    if (index === -1){
      cart.books.push( {id: bookId, qty: 1});
    // else (if IN cart) increment quantity
    } else {
      cart.books[index].qty ++;
    }

    res.status(200).send({ cart });
  },
  getCart: (req, res) => {
    console.log('cart on sessionN: ', req.session.user.cart)
    if (req.session.user.cart) res.status(200).send({ cart: req.session.user.cart });
    
    else res.status(401).send({ error: "no cart on session" });
  },
  editCart: (req, res) => {
    req.session.user.cart = req.body
    res.status(200).send(req.session.user.cart)
  }
};


// cart.books = [ { id: number, qty: number } ]