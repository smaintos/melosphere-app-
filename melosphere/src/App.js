import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './Composants/NavBar';
import Accueil from './Pages/accueil';

function App() {
 return (
    <Router>
      <div style={{ backgroundColor: '#000000' }}>
        <NavBar />
        <Switch>
          <Route path="/" exact component={Accueil} />
        </Switch>
      </div>
    </Router>
 );
}

export default App;
