import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Homepage from './Homepage';
import Compare from './Compare';
import Database from './Database';
import Error from './Error';
import Header from './components/Header'; // Make sure Header now uses CartButton
import Cart from './components/Cart';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header />
          <hr />
          <Switch>
            <Route exact path='/' component={Homepage} />
            <Route path='/compare' component={Compare} />
            <Route path='/database' component={Database} />
            <Route path='/cart' component={Cart} />
            <Route path='/404' component={Error} />
            <Redirect to="/404" />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;