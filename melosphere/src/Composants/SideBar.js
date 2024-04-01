import React from 'react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
    if (!isOpen) {
       return null; // Ne rien rendre si isOpen est false
    }
    return (
        <div className="fixed top-0 left-0 h-full w-64 bg-gray-800 text-white p-4" style={{ top: '50px' }}> {/* Ajustez la valeur de 'top' selon la hauteur de votre barre de navigation */}
            <ul>
                <li className="mb-2">Accueil</li>
                <li className="mb-2">Profil</li>
                <li className="mb-2">Historique</li>
                <li className="mb-2">Déconnexion</li>
            </ul>
        </div>
    );
};

export default Sidebar;
