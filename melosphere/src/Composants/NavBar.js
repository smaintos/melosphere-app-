import React, { useState, useEffect } from 'react';

const NavBar = () => {
 const [showSignUpModal, setShowSignUpModal] = useState(false);
 const [showLoginModal, setShowLoginModal] = useState(false);
 const [isLoggedIn, setIsLoggedIn] = useState(false);
 const [userPseudo, setUserPseudo] = useState('');

 const [signUpUsername, setSignUpUsername] = useState('');
 const [signUpEmail, setSignUpEmail] = useState('');
 const [signUpPassword, setSignUpPassword] = useState('');
 const [loginEmail, setLoginEmail] = useState('');
 const [loginPassword, setLoginPassword] = useState('');

 useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userPseudo = localStorage.getItem('userPseudo');
    if (isLoggedIn === 'true') {
      setIsLoggedIn(true);
      setUserPseudo(userPseudo);
    }
 }, []);

 const toggleSignUpModal = () => {
    setShowSignUpModal(!showSignUpModal);
 };

 const toggleLoginModal = () => {
    setShowLoginModal(!showLoginModal);
 };

 const handleSignUpSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://192.168.214.2:3002/inscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pseudo: signUpUsername, email: signUpEmail, mot_de_passe: signUpPassword }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }

      const data = await response.json();
      console.log('Inscription réussie :', data);
      setShowSignUpModal(false);
      alert('Inscription réussie');
      window.location.reload();
    } catch (error) {
      console.error('Erreur lors de l\'inscription :', error);
      alert('Erreur lors de l\'inscription');
    }
 };

 const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://192.168.214.2:3002/connexion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: loginEmail, mot_de_passe: loginPassword }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }

      const data = await response.json();
      console.log('Connexion réussie :', data);
      localStorage.setItem('isLoggedIn', true);
      localStorage.setItem('userPseudo', data.pseudo);
      setIsLoggedIn(true);
      setUserPseudo(data.pseudo);
      setShowLoginModal(false);
      alert('Connexion réussie');
      window.location.reload();
    } catch (error) {
      console.error('Erreur lors de la connexion :', error);
      alert('Erreur lors de la connexion');
    }
 };

 const handleLogout = () => {
    setIsLoggedIn(false);
    setUserPseudo('');
    localStorage.setItem('isLoggedIn', false);
    localStorage.setItem('userPseudo', '');
    window.location.href = '/accueil';
 };

 return (
  <nav className="bg-gray-800 text-white p-2">
    <div className="m-0 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <a href="/accueil" className="text-white text-2xl font-bold">Melosphere</a>
      </div>
      <div className="flex items-center space-x-4">
        {!isLoggedIn ? (
          <>
            <button onClick={toggleSignUpModal} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">S'inscrire</button>
            <button onClick={toggleLoginModal} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Se connecter</button>
          </>
        ) : (
          <>
            <span className="text-white">{userPseudo}</span>
            <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Déconnexion</button>
          </>
        )}
      </div>
    </div>

      {showSignUpModal && (
        <div className="fixed z-10 inset-0 flex items-center justify-center overflow-auto bg-black bg-opacity-85">
          <div className="relative bg-gray-800 px-8 py-6 w-96">
            <div className="flex justify-end">
             <button onClick={toggleSignUpModal} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Fermer</button>
            </div>
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
          </div>
        </div>
      )}

      {showLoginModal && (
        <div className="fixed z-10 inset-0 flex items-center justify-center overflow-auto bg-black bg-opacity-85">
          <div className="relative bg-gray-800 px-8 py-6 w-96">
           <div className="flex justify-end">
            <button onClick={toggleLoginModal} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Fermer</button>
            </div>
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
          </div>
        </div>
      )}
    </nav>
 );
};

export default NavBar;
