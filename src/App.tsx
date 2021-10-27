import React, { useState } from 'react';
import moon from './img-states/moon.png';
import './App.css';

function App() {
  const [datetime] = useState({
    year: '2021',
    month: 'Octubre',
    day: '26',
    time: '11:00',
    dayOfWeek: 'Domingo',
    isAM: true,
    is24Hs: false
  });
  const [language] = useState('es');

  return (
    <div className="background">
      <div className="image-container">
          <img className="image" src={moon} alt="image" /> 
          <p className="time">{getTime(datetime.time, datetime.isAM, datetime.is24Hs)}</p>
      </div>
      <div className="info-container">
        <div className="info">
          <h1>Ciudad de Guatemala</h1>
          <h2>Mayormente Despejado</h2>
          <h3>21°C</h3>
        </div>
        <div className="date">
          <p>{datetime.dayOfWeek}</p>
          <p>{getDateByLanguage(datetime.day,datetime.month,language)}</p>
          <p>{datetime.year}</p>
        </div>
      </div>
    </div>
  );
}

function getDateByLanguage(day: string, month: string, language: string){
  switch(language) {
    case 'es': return `${day} de ${month}`;
    case 'en': return `${month} ${day}th`;
    default: return `${day} de ${month}`;
  }
}

function getTime(time: string, isAM: boolean, is24Hs: boolean) {
  if (!is24Hs) {
    return isAM ? time+' AM' : time +' PM';
  }
  return time;
}

export default App;
