// Routes.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Accueil from './Pages/accueil';
import App from './App';

function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Accueil} />
        <Route path="/app" component={App} />
      </Switch>
    </Router>
  );
}

export default Routes;
