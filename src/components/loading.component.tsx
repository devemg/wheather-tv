import clearDay from '../img-states/clear-sky-day.png';

export default function LoadingComponent() {
  return (
    <div className="background-loading">
    <h1>Wheather TV</h1>
    <img className="image-loading" src={clearDay} alt="loading" /> 
  </div>
  )
}
