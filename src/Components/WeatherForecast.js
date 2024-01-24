
import React, { useState } from 'react';
import './WeatherForecast.css';

const apiKey = "e49f8a6855b22777ec4af43297afdc4a";

const WeatherForecast = () => {
  const [units, setUnits] = useState('imperial');
  const [weather, setWeather] = useState({
    icon: null,
    name: '',
    description: '',
    temp: '',
    speed: '',
    humidity: '',
  });
  const [searched, setSearched] = useState(false);

  const handleUnitChange = () => {
    setUnits(units === 'imperial' ? 'metric' : 'imperial');
  };

  const convertTemp = (temp) => {
    return units === 'imperial' ? `${temp}°F` : `${((temp - 32) * 5 / 9).toFixed(2)}°C`;
  };

  const convertSpeed = (speed) => {
    return units === 'imperial' ? `${speed} MPH` : `${(speed * 0.44704).toFixed(2)} m/s`;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let city = event.target.city.value;

    if (!city) {
      alert('Please enter the city name');
      return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`)
      .then(response => {
        if (!response.ok) {
          throw new Error();
        }
        return response.json();
      })
      .then(data => {
        setWeather({
          icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
          name: data.name,
          description: data.weather[0].description,
          temp: data.main.temp,
          speed: data.wind.speed,
          humidity: data.main.humidity,
        });
        setSearched(true);
      })
      .catch(error => {
        alert("Unable to fetch weather forecast!");
      });
  };

  return (
    <div className='weather'>
      <form onSubmit={handleSubmit}>
        <input type='text' name='city' placeholder='Search your location'></input>
        <button type='submit'>search</button>
      </form>
      {searched && (
        <div>
          <div className='top'>

          <div className="toggle">
              <button onClick={handleUnitChange}>
                {units === 'imperial' ? 'Switch to Metric' : 'Switch to Imperial'}
              </button>
            </div>
            <p className='cityName'>{weather.name}</p>
            {weather.icon && <img className='img' src={weather.icon} alt='...'></img>}

            {weather.description && (
              <div className='description'>
                {weather.description}
              </div>
            )}

            {weather.temp !== '' && (
              <div className='temprature'>
                <p className="bold">{convertTemp(weather.temp)}</p>
              </div>
            )}

          </div>
          <div className='bottom'>
            {weather.humidity !== '' && (
              <div className='humidity'>
                Humidity <i className='bi bi-water'></i>
                <br></br>
                {weather.humidity}%
              </div>
            )}

            {weather.speed !== '' && (
              <div className='windSpeed'>
                Wind Speed <i className='bi bi-wind'></i>
                <br></br>
                <p className="bold">{convertSpeed(weather.speed)}</p>
              </div>
            )}

            
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherForecast;
