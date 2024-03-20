import React from 'react';

const NavBar = () => {
 return (
    <nav className="bg-gray-800 text-white p-4"> {/* Couleur de fond de la navbar en gris foncé */}
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4 ml-0"> {/* Aucune marge à gauche pour ce conteneur */}
          <a href="/accueil" className="text-white text-4xl" style={{ marginLeft: 0 }}>Melosphere</a>
        </div>
        <div className="flex items-center space-x-4">
          <a href="#inscription" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">S'inscrire</a>
          <a href="#connexion" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Se connecter</a>
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Déconnexion</button> {/* Style spécifique pour le bouton */}
        </div>
      </div>
    </nav>
 );
};

export default NavBar;
