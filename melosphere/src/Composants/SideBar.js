import React from 'react';
import { Link } from 'react-router-dom'; // Importez Link


const Sidebar = ({ isOpen, toggleSidebar }) => {
    if (!isOpen) {
       return null; // Ne rien rendre si isOpen est false
    }


    return (
<div className="fixed top-0 left-0 h-full w-72 bg-black text-white p-4 flex flex-col space-y-4" style={{ top: '50px' }}>
  {/* Ajustez la valeur de 'top' selon la hauteur de votre barre de navigation */}
  <ul className="flex flex-col items-center">
    <li>
      <div className="mt-12 mb-12 px-3 py-2 rounded-md text-lm font-medium mr-[0.9rem] transform transition-transform duration-200 ease-in-out hover:scale-110">
        <Link to="/" onClick={toggleSidebar} className="text-white hover">Accueil</Link>
      </div>
    </li>
    <li>
      <div className="mt-12 mb-12 px-3 py-2 rounded-md text-lm font-medium mr-[0.9rem] transform transition-transform duration-200 ease-in-out hover:scale-110">
        <Link to="/playlists" onClick={toggleSidebar} className="text-white hover">Playlist</Link>
      </div>
    </li>
        <li>
      <div className="mt-12 mb-12 px-3 py-2 rounded-md text-lm font-medium mr-[0.9rem] transform transition-transform duration-200 ease-in-out hover:scale-110">
        <Link to="/melozone" onClick={toggleSidebar} className="text-white hover">Rejoindre la melozone</Link>
      </div>
    </li>
    <li>
      <div className="mt-12 mb-12 px-3 py-2 rounded-md text-lm font-medium mr-[0.9rem] transform transition-transform duration-200 ease-in-out hover:scale-110">
        <Link to="/Profil" onClick={toggleSidebar} className="text-white hover">Profil</Link>
      </div>
    </li>
    <li>
      <div className="mt-12 mb-12 px-3 py-2 rounded-md text-lm font-medium mr-[0.9rem] transform transition-transform duration-200 ease-in-out hover:scale-110">
        <Link to="/historique" onClick={toggleSidebar} className="text-white hover">Historique</Link>
      </div>
    </li>
  </ul>
</div>


    );
};

export default Sidebar;
