import React, { useState } from 'react';

const NavBar = () => {
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const toggleSignUpModal = () => {
    setShowSignUpModal(!showSignUpModal);
  };

  const toggleLoginModal = () => {
    setShowLoginModal(!showLoginModal);
  };

  return (
    <nav className="bg-gray-800 text-white p-2">
      <div className="m-0 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <a href="/accueil" className="text-white text-2xl font-bold">Melosphere</a>
        </div>
        <div className="flex justify-end items-center space-x-4">
          <button onClick={toggleSignUpModal} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">S'inscrire</button>
          <button onClick={toggleLoginModal} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Se connecter</button>
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Déconnexion</button>
        </div>
      </div>

      {/* Fenêtre modale d'inscription */}
      {showSignUpModal && (
        <div className="fixed z-10 inset-0 flex items-center justify-center overflow-auto bg-black bg-opacity-85">
          <div className="relative bg-gray-800 px-8 py-6 w-96">
            <div className="text-white text-xl font-semibold mb-4">Inscription</div>
            <form>
              {/* Inputs pour le pseudo, l'email et le mot de passe */}
              <div className="mb-4">
                <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="username">Pseudo</label>
                <input type="text" id="username" className="shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline" placeholder="Votre pseudo" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="email">Email</label>
                <input type="email" id="email" className="shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline" placeholder="Votre email" />
              </div>
              <div className="mb-6">
                <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="password">Mot de passe</label>
                <input type="password" id="password" className="shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline" placeholder="Votre mot de passe" />
              </div>
              <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline block mx-auto">S'inscrire</button> {/* Utilisation de mx-auto pour centrer horizontalement le bouton */}
            </form>
          </div>
        </div>
      )}

      {/* Fenêtre modale de connexion */}
      {showLoginModal && (
        <div className="fixed z-10 inset-0 flex items-center justify-center overflow-auto bg-black bg-opacity-85">
          <div className="relative bg-gray-800 px-8 py-6 w-96">
            <div className="text-white text-xl font-semibold mb-4">Connexion</div>
            <form>
              {/* Inputs pour l'email et le mot de passe */}
              <div className="mb-4">
                <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="email">Email</label>
                <input type="email" id="email" className="shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline" placeholder="Votre email" />
              </div>
              <div className="mb-6">
                <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="password">Mot de passe</label>
                <input type="password" id="password" className="shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline" placeholder="Votre mot de passe" />
              </div>
              <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline block mx-auto">Se connecter</button> {/* Utilisation de mx-auto pour centrer horizontalement le bouton */}
            </form>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
