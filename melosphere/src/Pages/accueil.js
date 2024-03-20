import React from 'react';
import NavBar from '../Composants/NavBar';

function Accueil() {
  return (
    <div>
      <header>
        <NavBar />
        <div className="bg-gray-100 h-screen">
          <div className="m-0 flex justify-center items-center pt-10">
            <h1 className="text-5xl">Youtube : La musique en mieux </h1>
          </div>
        </div> 
      </header>
    </div>
  );
}

export default Accueil;
