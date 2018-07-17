module.exports = {
    get_all_books: (req, res) => {
        const dbInstance = req.app.get('db')
        dbInstance.products.get_All_Books().then(products => res.status(200).send(products))
    }
}