import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { createRoot } from 'react-dom';
import Accueil from './Pages/Accueil';
import Profil from './Pages/Profil';
import Historique from './Pages/Historique';
import Inscription from './Pages/Inscription';
import Playlist from './Pages/Playlists';
import AdminPannel from './Pages/AdminPannel';



const root = document.getElementById('root');
createRoot(root).render(<App />);

function App() {
 // Fonction pour initialiser l'état de connexion à partir de localStorage
 const initializeIsLoggedIn = () => {
    return localStorage.getItem('isLoggedIn') === 'true';
 };


const [isLoggedIn] = useState(initializeIsLoggedIn);

 // Mettre à jour l'état de connexion dans localStorage chaque fois qu'il change
 useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn);
 }, [isLoggedIn]);

 return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Accueil />} />
          <Route path="/profil" element={
            isLoggedIn ? <Profil /> : <Navigate replace to="/inscription" />
          } />
          <Route path="/historique" element={
            isLoggedIn ? <Historique /> : <Navigate replace to="/inscription" />
          } />
          <Route path="/playlists" element={
            isLoggedIn ? <Playlist /> : <Navigate replace to="/inscription" />
          } />
          <Route path="/inscription" element={<Inscription />} />
          <Route path="/AdminPannel" element={<AdminPannel />} />

        </Routes>
      </BrowserRouter>
    </div>
 );
}

export default App;
