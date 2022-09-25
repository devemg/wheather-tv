import { useState, useEffect } from 'react';
import './App.css';
import moment from 'moment';
import 'moment/locale/es';
import LoadingComponent from './components/loading.component';
import WheatherComponent from './components/wheather.component';
import { getWheather } from './services/wheather.service';


function App() {
  const [isLoading, setLoading] = useState(true);
  const [language] = useState('es');
  const [location, setLocation] = useState({ city: '', country: '', region: '' });
  const [wheather, setWheater] = useState({ wheatherDescription: '', wheatherCode: 0, celsius: ''});

  useEffect(() => {
    moment.locale(language);
    getWheather(language).then(response => {
      setLocation({ city: response.location.city, country: response.location.country, region: response.location.regionName });
      setWheater({
        celsius: `${response.wheather.main.temp} °C`,
        wheatherDescription: response.wheather.weather[0].description,
        wheatherCode: response.wheather.weather[0].id
      });
    // loading
    setTimeout(() => {
        setLoading(false);  
    }, 1000);
  });
  }, [language]); // se ejecuta una sola vez al renderizar el componente.
 
  return !isLoading ? 
  <WheatherComponent wheather={wheather} location={location} language={language} /> 
  : <LoadingComponent/>;  
}

export default App;
