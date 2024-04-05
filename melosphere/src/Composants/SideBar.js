import React from 'react';
import { Link } from 'react-router-dom'; // Importez Link


const Sidebar = ({ isOpen, toggleSidebar }) => {
    if (!isOpen) {
       return null; // Ne rien rendre si isOpen est false
    }

    
    return (
        <div className="fixed top-0 left-0 h-full w-64 bg-gray-800 text-white p-4" style={{ top: '50px' }}> {/* Ajustez la valeur de 'top' selon la hauteur de votre barre de navigation */}
            <ul>
                <li className="mb-2">
                    <Link to="/" onClick={toggleSidebar}>Accueil</Link>
                </li>
                <li className="mb-2">
                    <Link to="/Profil" onClick={toggleSidebar}>Profil</Link>
                </li>
                <li className="mb-2">
                    <Link to="/historique" onClick={toggleSidebar}>Historique</Link>
                </li>
                <li className="mb-2">
                    <Link to="/deconnexion" onClick={toggleSidebar}>Déconnexion</Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
