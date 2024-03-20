import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './Composants/NavBar';
import Accueil from './Pages/accueil';

function App() {
 return (
    <Router>
      <div className="App" style={{ backgroundColor: 'black', minHeight: '100vh' }}>
        <NavBar />
        <Switch>
          <Route path="/" exact component={Accueil} />
          {/* Ajoutez d'autres routes ici */}
        </Switch>
      </div>
    </Router>
 );
}

export default App;
