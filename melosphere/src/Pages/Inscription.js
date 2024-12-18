import React, { useState } from 'react';

const Inscription = () => {
 const [signUpUsername, setSignUpUsername] = useState('');
 const [signUpEmail, setSignUpEmail] = useState('');
 const [signUpPassword, setSignUpPassword] = useState('');
 const [signupErrorMessage, setSignupErrorMessage] = useState('');

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
      setSignupErrorMessage(data.message); 
      return;
    }

    const data = await response.json();
    console.log('Inscription réussie :', data);
    alert('Inscription réussie');
    window.location.reload();
  } catch (error) {
    console.error('Erreur lors de l\'inscription :', error);
    alert('Erreur lors de l\'inscription');
  }
};

 return (
  <div className="fixed z-10 inset-0 flex items-center justify-center overflow-auto bg-zinc-900">
    <div className="bg-black rounded-lg shadow-2xl shadow-white p-8 w-full lg:max-w-xl flex flex-col items-center transform transition-transform duration-200 ease-in-out hover:-translate-y-3 hover:shadow-purple-500 border-2 border-white hover:border-purple-700">
      <div className="text-purple-400 text-xl font-semibold mb-4">Inscription</div>
      {signupErrorMessage && (
        <div className="text-red-500 mb-4">{signupErrorMessage}</div>
      )}
      <form onSubmit={handleSignUpSubmit}>
        <div className="mb-4">
          <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="username">Pseudo</label>
          <input type="text" id="username" value={signUpUsername} onChange={(e) => setSignUpUsername(e.target.value)} className="bg-black border-2 border-purple-500 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:border-white" placeholder="Votre pseudo" maxLength={20} pattern=".{0,20}" title="Le pseudo ne doit pas dépasser les 20 caractères."  />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="email">Email</label>
          <input type="email" id="email" value={signUpEmail} onChange={(e) => setSignUpEmail(e.target.value)} className="bg-black border-2 border-purple-500 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:border-white" placeholder="Votre email" title="L'email ne doit pas contenir de majuscules."/>
        </div>
        <div className="mb-6">
          <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="password">Mot de passe</label>
          <input type="password" id="password" value={signUpPassword} onChange={(e) => setSignUpPassword(e.target.value)} className="bg-black border-2 border-purple-500 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:border-white" placeholder="Votre mot de passe" title="Votre mot de passe doit contenir au moins 5 caractères." />
        </div>
        <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline block mx-auto">S'inscrire</button>
      </form>
      <div className="flex justify-end">
        <button onClick={() => window.location.href = '/'} className="absolute top-2 right-2 mt-3 text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Fermer</button>
      </div>
    </div>
  </div>
);
};

export default Inscription;
