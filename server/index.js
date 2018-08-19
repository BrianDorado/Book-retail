
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
app.get('/api/getcart', products.getCart)

// === PUT REQUESTS === //

app.put('/api/addtocart/:bookId', products.addToCart)
app.put('/api/editcart', products.editCart)

// === POST REQUESTS === //



// === DELETE REQUESTS === //

// ===== Stripe ===== //

app.post('/api/payment')

app.listen(port || 4044, () => {
    console.log(`listening on port ${port}`)
})