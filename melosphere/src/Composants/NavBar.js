import React, { useState } from 'react';

const NavBar = () => {
 const [showSignUpModal, setShowSignUpModal] = useState(false);
 const [showLoginModal, setShowLoginModal] = useState(false);

 // Gestionnaires d'état pour les données du formulaire
 const [signUpUsername, setSignUpUsername] = useState('');
 const [signUpEmail, setSignUpEmail] = useState('');
 const [signUpPassword, setSignUpPassword] = useState('');
 const [loginEmail, setLoginEmail] = useState('');
 const [loginPassword, setLoginPassword] = useState('');

 // Gestionnaire d'état pour les messages d'erreur
 const [errorMessage, setErrorMessage] = useState('');

 const toggleSignUpModal = () => {
    setShowSignUpModal(!showSignUpModal);
 };

 const toggleLoginModal = () => {
    setShowLoginModal(!showLoginModal);
 };

 // Gestionnaire d'événement pour le formulaire d'inscription
 const handleSignUpSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(''); // Réinitialiser le message d'erreur
    try {
      const response = await fetch('http://192.168.214.2:3002/inscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pseudo: signUpUsername, email: signUpEmail, mot_de_passe: signUpPassword }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'inscription');
      }

      const data = await response.json();
      console.log('Inscription réussie :', data);
      setShowSignUpModal(false); // Fermer le modal d'inscription
    } catch (error) {
      console.error('Erreur lors de l\'inscription :', error);
      setErrorMessage('Erreur lors de l\'inscription. Veuillez réessayer.');
    }
 };

 // Gestionnaire d'événement pour le formulaire de connexion
 const handleLoginSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(''); // Réinitialiser le message d'erreur
    try {
      const response = await fetch('http://192.168.214.2:3002/connexion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: loginEmail, mot_de_passe: loginPassword }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la connexion');
      }

      const data = await response.json();
      console.log('Connexion réussie :', data);
      setShowLoginModal(false); // Fermer le modal de connexion
    } catch (error) {
      console.error('Erreur lors de la connexion :', error);
      setErrorMessage('Erreur lors de la connexion. Veuillez réessayer.');
    }
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
            <form onSubmit={handleSignUpSubmit}>
              <div className="mb-4">
                <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="username">Pseudo</label>
                <input type="text" id="username" value={signUpUsername} onChange={(e) => setSignUpUsername(e.target.value)} className="shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline" placeholder="Votre pseudo" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="email">Email</label>
                <input type="email" id="email" value={signUpEmail} onChange={(e) => setSignUpEmail(e.target.value)} className="shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline" placeholder="Votre email" />
              </div>
              <div className="mb-6">
                <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="password">Mot de passe</label>
                <input type="password" id="password" value={signUpPassword} onChange={(e) => setSignUpPassword(e.target.value)} className="shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline" placeholder="Votre mot de passe" />
              </div>
              <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline block mx-auto">S'inscrire</button>
            </form>
            {errorMessage && <div className="text-red-500 mt-2">{errorMessage}</div>}
          </div>
        </div>
      )}

      {/* Fenêtre modale de connexion */}
      {showLoginModal && (
        <div className="fixed z-10 inset-0 flex items-center justify-center overflow-auto bg-black bg-opacity-85">
          <div className="relative bg-gray-800 px-8 py-6 w-96">
            <div className="text-white text-xl font-semibold mb-4">Connexion</div>
            <form onSubmit={handleLoginSubmit}>
              <div className="mb-4">
                <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="email">Email</label>
                <input type="email" id="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} className="shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline" placeholder="Votre email" />
              </div>
              <div className="mb-6">
                <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="password">Mot de passe</label>
                <input type="password" id="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} className="shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline" placeholder="Votre mot de passe" />
              </div>
              <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline block mx-auto">Se connecter</button>
            </form>
            {errorMessage && <div className="text-red-500 mt-2">{errorMessage}</div>}
          </div>
        </div>
      )}
    </nav>
 );
};

export default NavBar;
