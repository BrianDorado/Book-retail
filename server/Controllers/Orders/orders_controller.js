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
    const stripe = require("stripe")(process.env.STRIPE_TEST_SK);
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
        const { book1qty: maritalTherapyQty, book2qty: whatWeWishWedKnownQty } = cart;
        const date = new Date().toISOString()
        db.Orders.createOrderRecord([transactionRecord, JSON.stringify({ maritalTherapyQty, whatWeWishWedKnownQty }), date])
          .then(_ => {
            req.session.user.cart = {
              book1qty: 0,
              book2qty: 0
            };
            console.log('charge from const customer info', charge)
            const customerInfo = {
                amount:         charge.amount,
                address_line1:  charge.source.address_line1,
                address_line2:  charge.source.address_line2,
                address_city:   charge.source.address_city,
                address_state:  charge.source.address_state,
                address_zip:    charge.source.address_zip,
                email:          token.email,
                booksOrdered:    { maritalTherapyQty, whatWeWishWedKnownQty}

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

function sendEmail(res, customerEmail, orderId, customerInfo) {
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
  let message = {
      from: 'brinleybooks@gmx.com',
      to: customerEmail,
      subject: "Order Confirmation",
      html: `
      <div style="padding: 12px; background: dodgerblue; color: white; line-height:20px;">
        <h3>Order Confirmation</h3>
        <hr>
        <p style="color:white !important">
            Thank you for your order. You're order will be shipped to you soon.
            <br> 
            Your order ID is: <strong>${orderId}</strong>
            <br>
            Your order will be shipped to the following address
            <blockquote>
                ${customerInfo.address_line1}<br>
                ${customerInfo.address_line2?customerInfo.address_line2:''}<br>
                ${customerInfo.address_city}, ${customerInfo.address_state}<br>
                ${customerInfo.address_zip}
            </blockquote>
            <br>
            <h3> Order Details </h3>
            <hr>
            ${customerInfo.booksOrdered.maritalTherapyQty>0? 'Marital Therapy: quantity '+ customerInfo.booksOrdered.maritalTherapyQty: ''}<br>
            ${customerInfo.booksOrdered.whatWeWishWedKnownQty>0? 'What We Wish We\'d Known Before Our Honeymoon: quantity '+customerInfo.booksOrdered.whatWeWishWedKnownQty: ''}<br>
            Amount payed: ${convertCentsToDollars(customerInfo.amount)}
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
      to: [ process.env.invoiceEmail1, process.env.invoiceEmail2 ], 
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
            Marital Therapy: ${customerInfo.booksOrdered.maritalTherapyQty}<br>
            What We Wish We'd Known...: ${customerInfo.booksOrdered.whatWeWishWedKnownQty}<br>
            Amount paid: ${convertCentsToDollars(customerInfo.amount)}
            <br>
        </p>
      </div>
      `
  }
  transporter.sendMail(invoice, error=>{if(error)console.log('__mailer_error__',error)})
}

function convertCentsToDollars(int){
    int = String(int).split('');
    int.splice(-2,0,'.');
    return int.join('');
}