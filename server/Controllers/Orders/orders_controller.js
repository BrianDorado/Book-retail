// const bookList = require('../../bookList__old');
module.exports = {
  createNewOrder: (req, res) => {
    // not in use
    const dbInstance = req.app.get("db");
    const { book_id, qty, price_total } = req.body;

    try {
      dbInstance.orders.create_New_Order().then(order => res.status(200).send(order));
    } catch (error) {
      console.log(error);
    }
  },
  // _________________________stripe payment endpoint____________________________________
  stripePayment: (req, res, next) => {
    const { cart, token, amount, idempotencyKey } = req.body;
    console.log(' cart : ', cart)
    const stripe = require("stripe")(process.env.STRIPE_LIVE_SK);
    stripe.charges.create(
      {
        amount,
        currency: "usd",
        source: token.id,
        description: "Brinley Books payment " + new Date().toDateString()
      },
      {
        idempotency_key: idempotencyKey
      },
      function(err, charge) {
        if (err) console.error("___stripe error___", err);
        const db = req.app.get("db");
        const transactionRecord = JSON.stringify(charge);
        // cart 
        const date = new Date().toISOString()
        db.Orders.createOrderRecord([transactionRecord, JSON.stringify(cart), date])
          .then(_ => {
            req.session.user.cart = {
              books: []
            };
            console.log('charge from const customer info', charge)
            let booksOrdered = [];
            cart.books.forEach(b1=>{
              let book = bookList.find(b2=>b2.id===b1.id)
              book.qty = b1.qty;
              booksOrdered.push(book);
            })
            const customerInfo = {
                amount:         charge.amount,
                address_line1:  charge.source.address_line1,
                address_line2:  charge.source.address_line2,
                address_city:   charge.source.address_city,
                address_state:  charge.source.address_state,
                address_zip:    charge.source.address_zip,
                email:          token.email,
                booksOrdered
            }
            sendEmail(res, token.email, charge.id, customerInfo)
            res.status(200).send({ id: charge.id, email: token.email });
          })
          .catch(console.error);
      }
    );
    // ____________________stripe payment end_________________________________________________
  },
  testMail: (req, res, next) => {
    sendEmail(res, "nathanryan001@gmail.com");
  }
};

function sendEmail(res, customerEmail, orderId, customerInfo) { // customerInfo.booksOrdered
    console.log('customer info from inside sendEmail: ', customerInfo)
  const nodemailer = require("nodemailer");
  var smtpConfig = {
    host: "mail.gmx.com",
    port: 465,
    secure: true, // use SSL
    auth: {
      user: "brinleybooks@gmx.com",
      pass: process.env.gmxPW
    }
  };

  let transporter = nodemailer.createTransport(smtpConfig);
  let booksQuantity = ''
  customerInfo.booksOrdered.forEach(order=>{
    if (order.qty > 1)
    booksQuantity = booksQuantity.concat(`<p>${order.name}, Quantity: ${order.qty}</p>`)
  })
  let message = {
      from: 'brinleybooks@gmx.com',
      to: customerEmail,
      subject: "Order Confirmation",
      html: `
      <div style="padding: 12px; 
           background: dodgerblue; 
           color: white; line-height:20px;
           font-family: Helvetica, sans-serif;
           font-size: 18px;
           ">
        <h3>Order Confirmation</h3>
        <hr>
        <p>
            Thank you for your order.
            <br> 
            Your order ID is: <strong>${orderId}</strong>
            <br>
            Your order will be shipped to the following address:
            <blockquote>
                ${customerInfo.address_line1}<br>
                ${customerInfo.address_line2?customerInfo.address_line2:''}<br>
                ${customerInfo.address_city}, ${customerInfo.address_state}<br>
                ${customerInfo.address_zip}
            </blockquote>
            <br>
            <h3> Order Details </h3>
            <hr>
            ${booksQuantity}
            <br>
            Amount payed: $${convertCentsToDollars(customerInfo.amount).toFixed(2)}
            <hr>
            <br>
            If you have concerns or questions about your order, you may reply to this email.
        </p>
      </div>
      `
  }
  transporter.sendMail(message, error=>{if(error)console.log('__mailer_error__,',error)})
  let invoice = {
      from: 'brinleybooks@gmx.com',
      to: [ process.env.invoiceEmail1, process.env.invoiceEmail2 ], // invoiceEmail1
      subject: 'BRINLEY BOOKS ORDER MESSAGE',
      html: `
      <div style="padding: 12px; background: dodgerblue; color: white; lineHeight:20px;">
        <p style="color:white !important">
            orderID: <strong>${orderId}</strong>
            <br>
            customer email: ${customerInfo.email} 
            <br>
            customer address:<br>
            <blockquote>
                ${customerInfo.address_line1}<br>
                ${customerInfo.address_line2?customerInfo.address_line2:''}<br>
                ${customerInfo.address_city}, ${customerInfo.address_state}<br>
                ${customerInfo.address_zip}
            </blockquote>
            <br>
            ORDER DETAILS:<br>
            ${booksQuantity}
            Amount paid: $${convertCentsToDollars(customerInfo.amount).toFixed(2)}
            <br><hr>
        </p>
      </div>
      `
  }
  transporter.sendMail(invoice, error=>{if(error)console.log('__mailer_error__',error)})
}

function convertCentsToDollars(int){
    int = String(int).split('');
    int.splice(-2,0,'.');
    return parseInt(int.join(''),10);
}