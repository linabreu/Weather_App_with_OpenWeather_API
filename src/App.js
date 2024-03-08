
import './App.css';
import Header from './Components/Header';
import Search from './Components/Search';
import CurrentWeather from './Components/CurrentWeather';
import Forecast from './Components/Forecast';
import Footer from './Components/Footer';
import { useState } from 'react';
import {WEATHER_API_KEY}  from './api';
import { WEATHER_API_URL } from './api';


function App() {

  const [currentWeather, setCurrentWeather] = useState(null);
  const [currentForecast, setCurrentForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetched = fetch(`${WEATHER_API_URL}weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
    const forecastFetched = fetch(`${WEATHER_API_URL}forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);

    Promise.all([currentWeatherFetched, forecastFetched])
    .then(async (response) => {

      const weatherResponse = await response[0].json();
      const forecastResponse = await response[1].json();

      setCurrentWeather({city: searchData.label, ...weatherResponse});
      setCurrentForecast({city: searchData.label, ...forecastResponse});
    })
    .catch((err) => console.log(err));
  }

  const convertCelcius = (temp) => {
    const farenheit = (temp * 9/5) + 32;
    return Math.round(farenheit) + '°F';
}


  //console.log(currentWeather);
  //console.log(currentForecast);


  return (
    <div className="App">
      <div className = "page-container">
        <div className = "content-wrap">
          <Header/>
          <Search onSearchChange={handleOnSearchChange}/>
          {currentWeather && <CurrentWeather data ={currentWeather} convertFunc = {convertCelcius}/>}
          {currentForecast && <Forecast data = {currentForecast} convertFunc = {convertCelcius}/>}
        </div>
      <Footer/>
      </div>
    </div>
  );
}

export default App;
