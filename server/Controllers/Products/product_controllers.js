const books = require('./bookList');

module.exports = {
  getAllBooks: (req, res) => {
    res.status(200).send(books);
  },
  addToCart: (req, res) => {
    const { cart } = req.session.user;
    const bookId = parseInt(req.params.bookId,10);

    
    // if (bookId == 1) cart.book1qty++;
    // if (bookId == 2) cart.book2qty++;

    // check if book in cart
    let index = cart.books.findIndex( book => book.id === bookId)

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
  removeFromCart: (req, res) => {
    const { cart: { books: booksInCart } } = req.session.user;
    const { bookId } = req.params;
    let index = booksInCart.findIndex( book => book.id === parseInt(bookId))
    if (index === -1){
      return res.status(500).send({error: 'book not found'})
    }
    booksInCart.splice(index, 1);
    res.status(200).send(req.session.user.cart);
  },
  getCart: (req, res) => {
    if (req.session.user.cart) res.status(200).set('Cache-Control', 'no-cache,no-store').send({ cart: req.session.user.cart });
    
    else res.status(401).send({ error: "no cart on session" });
  },
  editCart: (req, res) => {
    req.session.user.cart = req.body
    res.status(200).send(req.session.user.cart)
  }
};


// cart.books = [ { id: number, qty: number } ]