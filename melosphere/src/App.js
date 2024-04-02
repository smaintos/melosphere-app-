// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Accueil from './Pages/Accueil';
import Profil from './Pages/Profil';
import Historique from './Pages/Historique';
import Deconnexion from './Pages/Deconnexion';

function App() {
 // État pour gérer l'état de connexion de l'utilisateur
 const [isLoggedIn, setIsLoggedIn] = useState(false);

 // Simulez la vérification de l'état de connexion de l'utilisateur
 useEffect(() => {
    // Ici, vous pouvez vérifier si l'utilisateur est connecté, par exemple en vérifiant un token dans le localStorage
    const loggedIn = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(loggedIn === 'true');
 }, []);

 return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Accueil />} />
          <Route path="/profil" element={
            isLoggedIn ? <Profil /> : <Navigate replace to="/inscription" />
          } />
          <Route path="/historique" element={<Historique />} />
          <Route path="/deconnexion" element={<Deconnexion />} />
          {/* Ajoutez d'autres routes ici */}
        </Routes>
      </BrowserRouter>
    </div>
 );
}

export default App;
