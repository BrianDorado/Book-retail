import React from 'react'
import { Link } from 'react-router-dom'

export default props => {
    return (
        <div id="drop-down-menu">
            <Link to='/'><h1>Contact</h1></Link><br/>
            <Link to='/other-stuff'><h1>Home</h1></Link><br/>
            <Link to='/'><h1>Books</h1></Link><br/>
            <Link to='/'><h1>About</h1></Link><br/>


        </div>
    )
}