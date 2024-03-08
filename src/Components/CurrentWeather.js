import React from 'react';



function CurrentWeather({data, convertFunc}) {
  return (
    
    <div className = "flex items-center justify-center">
    <div className = "h-500 w-80 glass big-margin">
        <div className = "top">
            <h1 className = "text-center text-2xl mt-5 mb-2 header">{data.city}</h1>
            <h1 className = "text-center text-6xl mb-3 mt-5">{convertFunc(Math.round(data.main.temp))}</h1>
            <img alt = "weather-icon" src = {`Images/${data.weather[0].icon}.png`} className = "m-auto weather-img"/>
            <h3 className = "text-center text-3xl mb-3">{data.weather[0].description}</h3>
        </div>
        <div className = "bottom">
          <p className = "text-center mt-2">Feels like: {convertFunc(Math.round(data.main.feels_like))};</p>
          <p className = "text-center mt-2">Wind: {data.wind.speed}s</p>
          <p className = "text-center mt-2 mb-4">Humidity: {data.main.humidity}%</p>
        </div>
    </div>
</div>
  )
}

export default CurrentWeather