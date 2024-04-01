import React, { useState, useRef } from 'react';
import NavBar from '../Composants/NavBar';
import SearchBar from '../Composants/SearchBar';

function Accueil() {
 const [isSidebarOpen, setIsSidebarOpen] = useState(false); 
 const containerRef = useRef(null); 


 return (
    <div ref={containerRef} style={{ backgroundColor: 'black', minHeight: '100vh' }}>
      <header>
        <NavBar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        <div className="bg-gray-100 h-screen">
          <div className="m-0 flex flex-col justify-center items-center pt-40">
            <h1 className="text-6xl mb-8 font-extraligh">Melosphere</h1>
            <SearchBar />
          </div>
        </div>
      </header>
    </div>
 );
}

export default Accueil;
