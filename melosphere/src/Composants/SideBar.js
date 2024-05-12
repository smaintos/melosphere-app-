import React from 'react';
import { Link } from 'react-router-dom'; 
import logo from './logomelosphere.png';

const Sidebar = ({ isOpen, toggleSidebar }) => {
    if (!isOpen) {
       return null; 
    }

    return (
      <div className="fixed top-0 left-0 h-full w-[18rem] bg-black text-white p-4 flex flex-col space-y-4" style={{ top: '50px' }}>
        <ul className="flex flex-col items-center">
          <li>
            <div className="mt-12 mb-12 px-3 py-2 text-lm font-medium mr-[0.9rem] transform transition-transform duration-200 ease-in-out hover:scale-110 hover:border-l-2 border-purple-800">
              <Link to="/" onClick={toggleSidebar}>Accueil</Link>
            </div>
          </li>
          <li>
            <div className="mt-12 mb-12 px-3 py-2 text-[0.9rem] font-medium mr-[0.9rem] transform transition-transform duration-200 ease-in-out hover:scale-125">
              <div className="flex items-center space-x-4"> 
                <img src={logo} alt="logo" className="h-8" />
                <div>
                  <Link to="/melozone" onClick={toggleSidebar}>Rejoindre la melozone</Link>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div className="mt-12 mb-12 px-3 py-2 text-lm font-medium mr-[0.9rem] transform transition-transform duration-200 ease-in-out hover:scale-125  hover:border-l-2 border-purple-800">
              <Link to="/playlists" onClick={toggleSidebar}>Playlist</Link>
            </div>
          </li>
          <li>
            <div className="mt-12 mb-12 px-3 py-2 text-lm font-medium mr-[0.9rem] transform transition-transform duration-200 ease-in-out hover:scale-125  hover:border-l-2 border-purple-800">
              <Link to="/Profil" onClick={toggleSidebar}>Profil</Link>
            </div>
          </li>
          <li>
            <div className="mt-12 mb-12 px-3 py-2 text-lm font-medium mr-[0.9rem] transform transition-transform duration-200 ease-in-out hover:scale-125  hover:border-l-2 border-purple-800">
              <Link to="/historique" onClick={toggleSidebar}>Historique</Link>
            </div>
          </li>
        </ul>
      </div>
    );
};

export default Sidebar;
