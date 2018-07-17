import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home/home';
import About from './components/About/About';
import TestComponent from './components/testComponent/testComponent';
import Cart from './components/Cart/Cart';

export default (
    <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/about" component={About}/>
        <Route path="/cart" component={Cart}/>
        
        
        <Route path="/other-stuff" component={TestComponent}/>
    </Switch>
)

