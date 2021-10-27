import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="background">
      <div className="image-container">
          <img className="image" src={logo} alt="image" /> 
          <p>11:00 PM</p>
      </div>
      <div className="info-container">
        <h1>Ciudad de Guatemala</h1>
        <h2>Mayormente Despejado</h2>
        <h3>21°C</h3>
        <p>Domingo</p>
        <p>24 de Octubre</p>
      </div>
    </div>
  );
}

export default App;
