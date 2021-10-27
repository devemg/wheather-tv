import React from 'react';
import moon from './img-states/moon.png';
import './App.css';

function App() {
  return (
    <div className="background">
      <div className="image-container">
          <img className="image" src={moon} alt="image" /> 
          <p className="time">11:00 PM</p>
      </div>
      <div className="info-container">
        <div className="info">
          <h1>Ciudad de Guatemala</h1>
          <h2>Mayormente Despejado</h2>
          <h3>21°C</h3>
        </div>
        <div className="date">
          <p>Domingo</p>
          <p>24 de Octubre</p>
          <p>2021</p>
        </div>
      </div>
    </div>
  );
}

export default App;
