import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home/home';
import About from './components/About/About';
import TestComponent from './components/testComponent/testComponent';
import Cart from './components/Cart/Cart';
import Landing from './components/Landing/Landing'
import Books from './components/Books/Books'

export default (
    <Switch>
        <Route exact path="/" component={Landing}/>
        <Route path="/about" component={About}/>
        <Route path="/cart" component={Cart}/>
        
        
        <Route path="/other-stuff" component={Books}/>
    </Switch>
)

