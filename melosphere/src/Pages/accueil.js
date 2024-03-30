import React from 'react';
import NavBar from '../Composants/NavBar';
import SearchBar from '../Composants/SearchBar';

function Accueil() {
  return (
    <div>
      <header>
        <NavBar />
        <div className="bg-gray-100 h-screen">
          <div className="m-0 flex flex-col justify-center items-center pt-40"> {/* Modification de la marge supérieure ici */}
            <h1 className="text-4xl lg:text-5xl mb-8">Youtube : La musique en mieux</h1>
            <SearchBar />
          </div>
        </div> 
      </header>
    </div>
  );
 }
 

export default Accueil;
