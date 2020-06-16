import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { Sample } from './Components/Sample';
import Header from './Components/Header/Header';

import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Header theme />
        <Switch>
          <Route exact path="/">
            <Sample />
          </Route>
          {/* <Route component={ WithNavigation } />*/}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
