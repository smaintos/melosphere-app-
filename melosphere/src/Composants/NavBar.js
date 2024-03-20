import React from 'react';

const NavBar = () => {
 return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="m-0 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <a href="/accueil" className="text-white text-4xl">Melosphere</a>
        </div>
        <div className="flex justify-end items-center space-x-4">
          <a href="#inscription" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">S'inscrire</a>
          <a href="#connexion" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Se connecter</a>
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Déconnexion</button>
        </div>
      </div>
    </nav>
 );
};

export default NavBar;
