// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Accueil from './Pages/Accueil';
import Profil from './Pages/Profil';
import Historique from './Pages/Historique';
import Inscription from './Pages/Inscription';
import Playlist from './Pages/Playlists';

function App() {
 const [isLoggedIn, setIsLoggedIn] = useState(false);
 

 useEffect(() => {
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
          <Route path="/historique" element={
            isLoggedIn ? <Historique /> : <Navigate replace to="/inscription" />
          } />
          <Route path="/playlists" element={
            isLoggedIn ? <Playlist /> : <Navigate replace to="/inscription" />
          } />
          <Route path="/inscription" element={<Inscription />} />
        </Routes>
      </BrowserRouter>
    </div>
 );
}

export default App;