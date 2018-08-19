module.exports = {
  get_all_books: (req, res) => {
    const dbInstance = req.app.get("db");
    dbInstance.products.get_All_Books().then(products => res.status(200).send(products));
  },
  addToCart: (req, res) => {
    const { cart } = req.session.user;
    const { bookId } = req.params;
    if (bookId == 1) cart.book1qty++;
    if (bookId == 2) cart.book2qty++;
    res.status(200).send({ cart });
  },
  getCart: (req, res) => {
    if (req.session.user.cart) res.status(200).send({ cart: req.session.user.cart });
    else res.status(401).send({ error: "no cart on session" });
  },
  editCart: (req, res) => {
    req.session.user.cart = req.body
    res.status(200).send(req.session.user.cart)
  }
};
