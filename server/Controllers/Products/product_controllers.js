module.exports = {
    get_all_books: (req, res) => {
        const dbInstance = req.app.get('db')
        try {
            dbInstance.products.get_All_Books().then(products => res.status(200).send(products))
        } catch (error) {
            console.log(error);
        }
    },

    get_mock_data: (req, res) => {
        const dbInstance = req.app.get('db')
        try {
            dbInstance.products.mock_data_books().then(mockData => res.status(200).send(mockData))
        } catch (error) {
            console.log('Mock Data error: ',error);
        }
    }
}