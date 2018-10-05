
const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      session = require('express-session'),
      massive= require('massive'),
      products = require('./Controllers/Products/product_controllers'),
      orders = require('./Controllers/Orders/orders_controller'),
      nodemailer = require('nodemailer'),
      port = 4044,
      middleware = require('./middleware/middleware'),
      path = require('path');

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
// ===== !!!!API KEYS NEEDED!! ===== //

// === GET REQUESTS === //
app.get('/api/products/books', products.getAllBooks)

app.get('/api/getcart', function(req,res,next){
    console.log('get cart middleware');
    return next();
}, products.getCart)
app.get('/api/testmailer', orders.testMail)
// === PUT REQUESTS === //

app.put('/api/addtocart/:bookId', products.addToCart)
app.put('/api/editcart', products.editCart)

// === POST REQUESTS === //
app.post('/api/create/order', orders.createNewOrder)


// === DELETE REQUESTS === //
app.delete('/api/delete/:bookId', products.removeFromCart)

// ===== Stripe ===== //

app.post( '/api/payment', orders.stripePayment)

// ===== BrowserRouter ==== //
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
});

// ===== ServerPort ===== //

app.listen(port || 4044, () => {
    console.log(`listening on port ${port}`)
})