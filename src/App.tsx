import { useState, useEffect } from 'react';
import clearDay from './img-states/clear-sky-day.png';
import clearNight from './img-states/clear-sky-night.png';
import cloudsDay from './img-states/few-clouds-day.png';
import cloudsNight from './img-states/few-clouds-night.png';
import clouds from './img-states/clouds.png';
import lightRainDay from './img-states/light-rain-day.png';
import lightRainNight from './img-states/light-rain-night.png';
import rain from './img-states/rain.png';
import snowDay from './img-states/snow-day.png';
import snowNight from './img-states/snow-night.png';
import snow from './img-states/snow.png';
import storm from './img-states/storm.png';
import axios from 'axios';
import './App.css';
import moment from 'moment';
import 'moment/locale/es';


function App() {
  const [isLoading, setLoading] = useState(true);
  const [date, setDate] = useState({
    year: '',
    month: '',
    day: '',
    dayOfWeek: '',
  });
  const [time, setTime] = useState({ hours: '', minutes:'', isAM: true, isMorning: false });
  const [language] = useState('es');
  const [wheather, setWheater] = useState({
    location: { city: '', country: '', region: '' },
    wheatherDescription: '',
    wheatherCode: 0,
    celsius: ''
  });

  useEffect(() => {
    moment.locale(language);
    axios.get(`http://ip-api.com/json?lang=${language}`)
    .then(r => r.data)
    .then(response => {
      console.log('Location: ', response);
      axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${response.lat}&lon=${response.lon}&units=metric&lang=${language}&APPID=ee054a87257ae80863574e6c33b0ab77`)
    .then(r => r.data)
    .then(responseWheather => {
      console.log('Wheather: ', responseWheather);
      const date = moment();
      setDate({
        year: date.year().toString(),
        month: date.format('MMMM'),
        day: date.day().toString(),
        dayOfWeek: date.format('dddd'),
      });
      setTime({ 
        hours: date.format('hh'), 
        minutes: date.format('mm'), 
        isAM:date.format('A') === 'AM',
        isMorning: date.hour() < 18
      });
      // set wehather
      setWheater({
        location: { city: response.city, country: response.country, region: response.regionName },
        celsius: `${responseWheather.main.temp} °C`,
        wheatherDescription: responseWheather.weather[0].description,
        wheatherCode: responseWheather.weather[0].id
        //wheatherCode: states[Math.floor(Math.random() * states.length)]
      });
      setTimeout(() => {
        setLoading(false);  
      }, 1000);
    })
    })
  }, [language]); // se ejecuta una sola vez al renderizar el componente.
 
  return !isLoading ? (
    <div className={getBackground(wheather.wheatherCode, time.isMorning)}>
      <div className="image-container">
          <img className="image" src={getImageByStatus(wheather.wheatherCode, time.isMorning)} alt="wheather-img" /> 
          <p className="time">{time.hours}:{time.minutes} {time.isAM? 'AM' : 'PM'}</p>
      </div>
      <div className="info-container">
        <div className="info">
          <h1>{  wheather.location.city === wheather.location.country ? wheather.location.city : wheather.location.country }</h1>
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
  ) : <div className="background-loading">
    <h1>Wheather TV</h1>
    <img className="image-loading" src={clearDay} alt="loading" /> 
  </div>;  
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
    // RAIN
    case 200:
    case 201:
    case 500:
    case 501:
    case 502:
    case 503:
    case 504:
      return isMorning ? lightRainDay : lightRainNight;
    case 600:
    case 601:
    case 602:
        return isMorning? snowDay : snowNight; 
    default: 
    // SNOW
    if (code >= 600 && code <=622) {
      return snow;
    }
    // Thunderstorm
    if (code >= 200 && code <=232) {
      return storm;
    }
    // raining 
    if ((code >=300 && code <=321) || (code >=500 && code <=531)) {
      return rain;
    }
  }
  return clouds;
}

export default App;
