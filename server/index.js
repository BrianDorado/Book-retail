
const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      session = require('express-session'),
      massive= require('massive'),
      products = require('./Controllers/Products/product_controllers')
      port = 4044,
      middleware = require('./middleware/middleware')


require('dotenv').config()


// ========== MIDDLEWARE ========== //

app.use(express.static('build'))
massive(process.env.CONNECTION_STRING).then(dbInstance => {
    app.set('db', dbInstance) 
})

// ===== TOP LEVEL MIDDLEWARE ===== //

app.use(bodyParser.json());
app.use(session({
     secret: process.env.SESSION_SECRET,
     saveUninitialized: false,
     resave: false
}));

// ===== CUSTOM MIDDLEWARE ===== //
app.use(middleware.checkForSession)


// ========== ENDPOINTS ========== //

// === GET REQUESTS === //
app.get('/api/products/books', products.get_all_books)


// === PUT REQUESTS === //
app.put('/api/addtocart/:bookId', (req, res)=>{
    console.log('__addtocart endpoint__')

    console.log(' ordering book: ' + req.params.bookId)
    const { bookId } = req.params
    if (bookId==1)
        req.session.user.cart.book1qty ++
    if (bookId==2)
        req.session.user.cart.book2qty ++
    console.log('req,session: ', req.session)
    res.status(200).send({
        usercart: req.session.user.cart
    })
})


// === POST REQUESTS === //



// === DELETE REQUESTS === //

// ===== Stripe ===== //

app.post('/api/payment')

app.listen(port || 4044, () => {
    console.log(`listening on port ${port}`)
})