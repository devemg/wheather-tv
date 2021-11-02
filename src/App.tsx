import { useState, useEffect } from 'react';
import moon from './img-states/moon.png';
import './App.css';
import moment from 'moment';
import 'moment/locale/es';

function App() {
  const [date, setDate] = useState({
    year: '',
    month: '',
    day: '',
    dayOfWeek: '',
    isMorning: false
  });
  const [time, setTime] = useState({ hours: 0, minutes:0, isAM: true });
  const [language] = useState('es');
  const [wheather, setWheater] = useState({
    location: { city: '', country: '', region: '' },
    wheatherStatus: '',
    celsius: ''
  });
  //const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    moment.locale(language);
    fetch(`http://ip-api.com/json?lang=${language}`).then(res => res.json()).then((response) => {
      console.log(response);
      fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${response.lat}&lon=${response.lon}&units=metric&lang=${language}&APPID=ee054a87257ae80863574e6c33b0ab77`)
      .then(res1 => res1.json()).then((responseWheather) => {
      console.log(responseWheather);
      //setLoading(false);
      //set location and wheather

      //set date and time
      const date = moment();
      setDate({
        year: date.year().toString(),
        month: date.format('MMMM'),
        day: date.day().toString(),
        dayOfWeek: date.format('dddd'),
        isMorning: false
      });

      setTime({ hours: date.hour(), minutes: date.minute(), isAM: isAM(date.hour())});
      //console.log(generateGreetings())
      setWheater({
        location: { city: response.city, country: response.country, region: response.regionName },
        celsius: `${responseWheather.main.temp} °C`,
        wheatherStatus: responseWheather.weather.map((element:any)=>element.description).join(',')
      });
    })
    })
  }, [language]); // se ejecuta una sola vez al renderizar el componente.
 
  return (
    <div className="background">
      <div className="image-container">
          <img className="image" src={moon} alt="image" /> 
          <p className="time">{time.hours}:{time.minutes} {time.isAM? 'AM' : 'PM'}</p>
      </div>
      <div className="info-container">
        <div className="info">
          <h1>{  wheather.location.city }</h1>
          <h2>{  !wheather.location.region.includes(wheather.location.city) ? wheather.location.region : '' }</h2>
          <h2>{  !wheather.location.country.includes(wheather.location.city) ? wheather.location.country : ''}</h2>
          <h3>{ wheather.wheatherStatus }</h3>
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

function getDateByLanguage(day: string, month: string, language: string){
  switch(language) {
    case 'es': return `${day} de ${month}`;
    case 'en': return `${month} ${day}th`;
    default: return `${day} de ${month}`;
  }
}

function isAM(currentHour:number){
  return currentHour >= 0 && currentHour < 12;
}

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
