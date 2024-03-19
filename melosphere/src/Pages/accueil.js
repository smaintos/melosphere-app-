import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginButton from '../Composants/loginbutton';

function Accueil() {
  return (
    <div>
      <header>
        <h1>Melosphere</h1>
        <LoginButton />
      </header>
    </div>
  );
}

export default Accueil;
