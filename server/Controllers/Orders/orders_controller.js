module.exports = {
  createNewOrder: (req, res) => {
    const dbInstance = req.app.get("db");
    const { book_id, qty, price_total } = req.body;

    try {
      dbInstance.orders.create_New_Order().then(order => res.status(200).send(order));
    } catch (error) {
      console.log(error);
    }
  },
  stripePayment: (req, res, next) => {
    const { cart, token, amount, idempotencyKey } = req.body;
    const stripe = require("stripe")(process.env.STRIPE_TEST_SK);
    stripe.charges.create(
      {
        amount,
        currency: "usd",
        source: token.id,
        description: "stripe checkout test"
      },
      {
        idempotency_key: idempotencyKey
      },
      function(err, charge) {
        if (err) console.error("___stripe error___", err);
        const db = req.app.get("db");
        const transactionRecord = JSON.stringify(charge);
        const { book1qty: maritalTherapyQty, book2qty: whatWeWishWedKnownQty } = cart;
        db.Orders.createOrderRecord([transactionRecord, JSON.stringify({ maritalTherapyQty, whatWeWishWedKnownQty })])
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
                booksOrderd:    { maritalTherapyQty, whatWeWishWedKnownQty}

            }
            sendEmail(res, token.email, charge.id, customerInfo)
            res.status(200).send({ id: charge.id, email: token.email });
          })
          .catch(console.error);
      }
    );
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
        <p>
        Thank you for your order. You're order will be shipped to you soon.
        <br> 
        Your order ID is: <strong>${orderId}</strong>
        <br>
        Your order will be shipped to the following address
        <blockquote>
            ${customerInfo.address_line1}<br>
            ${customerInfo.address_line2}<br>
            ${customerInfo.address_city}, ${customerInfo.address_state}<br>
            ${customerInfo.address_zip}
        </blockquote>
        <br>
        <h3> Order Details </h3>
        <hr>
        ${customerInfo.maritalTherapyQty>0? 'Marital Therapy: '+ customerInfo.maritalTherapyQty: null}<br>
        ${customerInfo.whatWeWishWedKnownQty>0? 'What We Wish We\'d Known Before Our Honeymoon: '+customerInfo.whatWeWishWedKnownQty: null}<br>
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
      to: process.env.invoiceEmail,
      subject: 'BRINLEY BOOKS ORDER MESSAGE',
      html: `
      <div style="padding: 12px; background: dodgerblue; color: white; lineHeight:20px;">
        <p>
            orderID: <strong>${orderId}</strong>
            <br>
            customer email: ${customerInfo.email} 
            <br>
            customer address:<br>
            <blockquote>
                ${customerInfo.address_line1}<br>
                ${customerInfo.address_line2}<br>
                ${customerInfo.address_city}, ${customerInfo.address_state}<br>
                ${customerInfo.address_zip}
            </blockquote>
            <br>
            order details:<br>
            Marital Therapy: ${customerInfo.maritalTherapyQty}<br>
            What We Wish We'd Known...: ${customerInfo.whatWeWishWedKnownQty}<br>
            Amount paid: ${customerInfo.amount}
            <br>
        </p>
      </div>
      `
  }
  transporter.sendMail(invoice, error=>{if(error)console.log('__mailer_error__',error)})
}
