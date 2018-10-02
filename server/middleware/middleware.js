module.exports = {
    // creates auser object with a cart, on session
    // if one doesn't already exists.
    checkForSession(req, res, next){
        if(!req.session.user){
            req.session.user = {
                cart: {
                    books: [
                        // { id: number, qty: number }
                    ]
                }
            }
        }
        return next()
    }
}