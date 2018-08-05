
const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      session = require('express-session'),
      massive= require('massive'),
      products = require('./Controllers/Products/product_controllers')
      port = 3000;

require('dotenv').config()


// ========== MIDDLEWARE ========== //

massive(process.env.CONNECTION_STRING).then(dbInstance => {
    app.set('db', dbInstance) 
})

// ===== TOP LEVEL MIDDLEWARE ===== //

app.use(bodyParser.json());
app.use(session({
     secret: process.env.SESSION_SECRET,
     saveUnitialized: false,
     resave: false
}));

// ===== CUSTOM MIDDLEWARE ===== //



// ========== ENDPOINTS ========== //

// === GET REQUESTS === //
app.get('/api/products/books', products.get_all_books)


// === PUT REQUESTS === //



// === POST REQUESTS === //



// === DELETE REQUESTS === //

// ===== Stripe ===== //
app.post('/api/payment')

app.listen(port || 4044, () => {
    console.log(`listening on port ${port}`)
})