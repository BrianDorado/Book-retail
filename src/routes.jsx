import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home/home';
import About from './components/About/About';
import TestComponent from './components/testComponent/testComponent';

export default (
    <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/about" component={About}/>
        
        
        
        <Route path="/other-stuff" component={TestComponent}/>
    </Switch>
)

