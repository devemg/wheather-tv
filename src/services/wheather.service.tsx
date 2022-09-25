import axios from 'axios';


export const getWheather = async (language: string): Promise<any> => {
    try {
        const location = await axios.get(`http://ip-api.com/json?lang=${language}`);
        const wheather = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${location.data.lat}&lon=${location.data.lon}&units=metric&lang=${language}&APPID=ee054a87257ae80863574e6c33b0ab77`);
        return {
            location: location.data,
            wheather: wheather.data,
        }
    } catch (e) {
        Promise.reject(e);
    }
}

