import { useState, useEffect } from 'react';
import clearDay from './img-states/clear-sky-day.png';
import clearNight from './img-states/clear-sky-night.png';
import cloudsDay from './img-states/few-clouds-day.png';
import cloudsNight from './img-states/few-clouds-night.png';
import clouds from './img-states/clouds.png';

import './App.css';
import moment from 'moment';
import 'moment/locale/es';

function App() {
  const [date, setDate] = useState({
    year: '',
    month: '',
    day: '',
    dayOfWeek: '',
  });
  const [time, setTime] = useState({ hours: 0, minutes:0, isAM: true, isMorning: false });
  const [language] = useState('es');
  const [wheather, setWheater] = useState({
    location: { city: '', country: '', region: '' },
    wheatherDescription: '',
    wheatherCode: 0,
    celsius: ''
  });
  //const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    moment.locale(language);
    fetch(`http://ip-api.com/json?lang=${language}`).then(res => res.json()).then((response) => {
      fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${response.lat}&lon=${response.lon}&units=metric&lang=${language}&APPID=ee054a87257ae80863574e6c33b0ab77`)
      .then(res1 => res1.json()).then((responseWheather) => {
      //setLoading(false);
      //set date and time
      const date = moment();
      setDate({
        year: date.year().toString(),
        month: date.format('MMMM'),
        day: date.day().toString(),
        dayOfWeek: date.format('dddd'),
      });
      setTime({ 
        hours: Number(date.format('hh')), 
        minutes: Number(date.format('mm')), 
        isAM:date.format('A') == 'AM',
        isMorning: date.hour() + 5 < 18
      });
      // set wehather
      setWheater({
        location: { city: response.city, country: response.country, region: response.regionName },
        celsius: `${responseWheather.main.temp} °C`,
        wheatherDescription: responseWheather.weather[0].description,
        wheatherCode: 800 //responseWheather.weather[0].id
      });
    })
    })
  }, [language]); // se ejecuta una sola vez al renderizar el componente.
 
  return (
    <div className={getBackground(wheather.wheatherCode, time.isMorning)}>
      <div className="image-container">
          <img className="image" src={getImageByStatus(wheather.wheatherCode, time.isMorning)} alt="image" /> 
          <p className="time">{time.hours}:{time.minutes} {time.isAM? 'AM' : 'PM'}</p>
      </div>
      <div className="info-container">
        <div className="info">
          <h1>{  wheather.location.city == wheather.location.country ? wheather.location.city : wheather.location.country }</h1>
          <h2>{  !wheather.location.region.includes(wheather.location.city) ? wheather.location.region : '' }</h2>
          <h2>{  !wheather.location.country.includes(wheather.location.city) ? wheather.location.country : ''}</h2>
          <h3>{ wheather.wheatherDescription }</h3>
          <h3>{ wheather.celsius}</h3>
        </div>
        <div className="date">
          <p>{date.dayOfWeek}</p>
          <p>{getDateByLanguage(date.day,date.month,language)}</p>
          <p>{date.year}</p>
        </div>
      </div>
    </div>
  );  
}
/**
 * Format the date by language 
 * @param day 
 * @param month 
 * @param language 
 * @returns 
 */
function getDateByLanguage(day: string, month: string, language: string){
  switch(language) {
    case 'es': return `${day} de ${month}`;
    case 'en': return `${month} ${day}th`;
    default: return `${day} de ${month}`;
  }
}

/**
 * Get background gradient by the code of wheater and if is day or night
 * @param code 
 * @param isMorning 
 * @returns 
 */
function getBackground(code: number, isMorning: boolean) {
  let background = '';

  if (isMorning) {
    if (code >= 800) {
      background = 'background-day';
    } else {
      background = 'background-gray-day';
    }
  } else {
    if (code >= 800) {
      background = 'background-night';
    } else {
      background = 'background-gray-night';
    }
  }
  return 'background '+ background;
}

/**
 * Get image by wheather code and if is day or night
 * @param code 
 * @param isMorning 
 * @returns 
 */
function getImageByStatus(code: number, isMorning: boolean) {
  switch (code) {
    // CLOUDS
    case 801:
    case 802:
      return isMorning ? cloudsDay : cloudsNight;
    case 803:
    case 804: 
      return clouds;
    // CLEAR
    case 800: 
      return isMorning ? clearDay : clearNight;
    default: 
    // SNOW
    if (code >= 600 && code <=622) {
      return clouds;
    }
  }
  return clouds;
}

/**
 * Generate Message by hour
 * @returns 
 */
/*
function generateGreetings(){
  const currentHour = moment().hour();
  if (currentHour >= 3 && currentHour < 12){
      return "Good Morning";
  } else if (currentHour >= 12 && currentHour < 15){
      return "Good Afternoon";
  }   else if (currentHour >= 15 && currentHour < 20){
      return "Good Evening";
  } else if (currentHour >= 20 && currentHour < 3){
      return "Good Night";
  } else {
      return "Hello"
  }

}*/

export default App;
