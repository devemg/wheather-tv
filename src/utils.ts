
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
import clearDay from './img-states/clear-sky-day.png';
  
  /**
   * Get background gradient by the code of wheater and if is day or night
   * @param code 
   * @param isMorning 
   * @returns 
   */
  export const getBackground = (code: number, isMorning: boolean) => {
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
  export const getImageByStatus = (code: number, isMorning: boolean) => {
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
  