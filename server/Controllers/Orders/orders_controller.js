module.exports ={ 
    create_New_Order: (req, res) => {
        const dbInstance = req.app.get('db')
        const {book_id, qty, price_total} = req.body
        
        try {
            dbInstance.orders.create_New_Order().then(order => res.status(200).send(order))
        } catch (error) {
            console.log(error);
        }
    },
    stripePayment: (req,res, next) => {
        const stripe = require('stripe')(process.env.REACT_APP>STRIPE_PRIVATE_KEY)
        try {
            const charge = stripe.charges.create({
                    source: req.body.token.id,
                    amount: req.body.amount,
                    currency: 'usd',
                    description: 'Stripe Checkout Test'
                })
        } catch (error) {
            console.log('Stripe Payment Error:', error);
        }
    }
}