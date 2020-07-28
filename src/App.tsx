import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { Home } from './Components/Home/Home';
import Header from './Components/Header/Header';

import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Header theme />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          {/* <Route component={ WithNavigation } />*/}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
