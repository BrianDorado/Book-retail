module.exports ={ 
    create_New_Order: (req, res) => {
        const dbInstance = req.app.get('db')

        dbInstance.orders.create_New_Order().then(order => res.status (200).send(order))
    }
}