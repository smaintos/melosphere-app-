import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Accueil from './Pages/accueil';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Accueil /> 
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
