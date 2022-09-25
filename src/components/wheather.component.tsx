import Moment from 'react-moment';
import { getBackground, getImageByStatus } from '../utils';
import moment from 'moment';

export default function WheatherComponent({wheather, location, language }: any) {
  const isMorning = moment().hour() < 18;  

  return (
    <div className={getBackground(wheather.wheatherCode, isMorning)}>
      <div className="image-container">
          <img className="image" src={getImageByStatus(wheather.wheatherCode, isMorning)} alt="wheather-img" /> 
          <p className="time"><Moment interval={60000} format="hh:mm A"></Moment></p>
          
      </div>
      <div className="info-container">
        <div className="info">
          <h1>{  location.city === location.country ? location.city : location.country }</h1>
          <h2>{  !location.region.includes(location.city) ? location.region : '' }</h2>
          <h2>{  !location.country.includes(location.city) ? location.country : ''}</h2>
          <h3>{ wheather.wheatherDescription }</h3>
          <h3>{ wheather.celsius}</h3>
        </div>
        <div className="date">
        {/** Update every one hour */}
          <p>{ <Moment interval={3600000} format="dddd"></Moment>}</p>
          <p>{ <Moment interval={3600000} format="LL"></Moment>}</p>
        </div>
      </div>
    </div>
  )
}
