import './App.css';
import logo from './logo.png';
import WeatherForecast from './Components/WeatherForecast';

function App() {
  return(
    <div className='container'>
      <img src={logo} alt='logo' className='logo'></img>
        <WeatherForecast/>
    </div>
  )
}

export default App;
