import { useState, useEffect } from 'react';
import moon from './img-states/moon.png';
import './App.css';
import moment from 'moment'

function App() {
  const [datetime, setDatetime] = useState({
    year: '',
    month: '',
    day: '',
    time: '',
    dayOfWeek: '',
    isMorning: false
  });
  const [language] = useState('en');
  const [wheather, setWheater] = useState({
    location: { city: '', country: '', region: '' },
    wheatherStatus: '',
    celsius: ''
  });
  //const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://ip-api.com/json/').then(res => res.json()).then((response) => {
      console.log(response);
      fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${response.lat}&lon=${response.lon}&units=metric&APPID=ee054a87257ae80863574e6c33b0ab77`)
      .then(res1 => res1.json()).then((responseWheather) => {
      console.log(responseWheather);
      //setLoading(false);
      //set location and wheather

      //set date and time
      const date = moment();
      setDatetime({
        year: date.year().toString(),
        month: date.format('MMMM'),
        day: date.day().toString(),
        time: date.format('hh:mm a'),
        dayOfWeek: date.format('dddd'),
        isMorning: false
      });
      //console.log(generateGreetings())
      setWheater({
        location: { city: response.city, country: response.country, region: response.regionName },
        celsius: `${responseWheather.main.temp} °C`,
        wheatherStatus: responseWheather.weather.map((element:any)=>element.description).join(',')
      });
      /*setInterval(()=>{
        setDatetime({...datetime, time:moment().format('hh:mm a')});
      },6000); */
    })
    })
  }, []); // se ejecuta una sola vez al renderizar el componente.
 
  return (
    <div className="background">
      <div className="image-container">
          <img className="image" src={moon} alt="image" /> 
          <p className="time">{datetime.time}</p>
      </div>
      <div className="info-container">
        <div className="info">
          <h1>{  wheather.location.city }</h1>
          <h2>{  !wheather.location.region.includes(wheather.location.city) ? wheather.location.region : '' }</h2>
          <h2>{  !wheather.location.country.includes(wheather.location.city) ? wheather.location.country : ''}</h2>
          <h3>{ wheather.celsius}</h3>
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
  return time;
}

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

}

export default App;
