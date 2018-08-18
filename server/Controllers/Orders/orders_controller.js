module.exports ={ 
    create_New_Order: (req, res) => {
        const dbInstance = req.app.get('db')
        const {book_id, qty, price_total} = req.body
        
        try {
            dbInstance.orders.create_New_Order().then(order => res.status(200).send(order))
        } catch (error) {
            console.log(error);
        }
    }
}