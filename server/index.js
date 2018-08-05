
const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      session = require('express-session'),
      massive= require('massive'),
      products = require('./Controllers/Products/product_controllers'),
      orders = require('./Controllers/Orders/orders_controller')
      port = 4044;

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
// ===== !!!!API KEYS NEEDED!! ===== //

// === GET REQUESTS === //
app.get('/api/products/books', products.get_all_books)
app.get('/api/mock/books', products.get_mock_data)


// === PUT REQUESTS === //



// === POST REQUESTS === //
app.post('/api/create/order', orders.create_New_Order)


// === DELETE REQUESTS === //

// ===== Stripe ===== //
app.post('/api/payment')

// ===== ServerPort ===== //

app.listen(port || 4044, () => {
    console.log(`listening on port ${port}`)
})