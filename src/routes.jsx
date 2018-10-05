import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home/home";
import About from "./components/About/About";
import Cart from "./components/Cart/Cart";
import Landing from "./components/Landing/Landing";
import Books from "./components/Books/Books";
import Contact from "./components/Contact/Contact";
import {SomeContext} from "./context/testContext";

export default (
  <Switch>
    <Route exact path="/" component={Landing} />
    <Route path="/about" component={About} />
    <Route path="/cart" render={props => <SomeContext.Consumer>{({openModal, toggleLoader}) => <Cart {...props} openModal={openModal} toggleLoader={toggleLoader} />}</SomeContext.Consumer>} />
    <Route path="/contact" component={Contact} />

    <Route path="/books" component={Books} />
  </Switch>
);
