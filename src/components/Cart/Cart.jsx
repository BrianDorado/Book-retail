import React from 'react'

export default class Cart extends React.Component {
    constructor(props){
        super(props)
        this.state={
            cart: []
        }
    }

    render() {
        return(
            <div className="cart-component">

            <span className="header-text">your cart. <a href="#">sign in</a> to save your purchase history.</span>
            <div className="cart-view-container">
                I am the cart container

            </div>

            </div>
        )
    }
}