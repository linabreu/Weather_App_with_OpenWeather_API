

import React from 'react';
import Slider from "react-slick";
import { ImClock } from "react-icons/im";


function Forecast({data, convertFunc}) {

    function formatTime (timeString) {
        const [hourString, minute] = timeString.split(":");
        const hour = +hourString % 24;
        return (hour % 12 || 12) + ":" + minute + (hour < 12 ? "AM" : "PM");
    }

    function formatDate(dateString) {
        var date = new Date(dateString);
        if (!isNaN(date.getTime())) {
            // Months use 0 index.
            const newDate = date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear();
            const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            const now = new Date(newDate);
            return (days[now.getDay()] + ', ' + months[now.getMonth()] + ' ' + now.getDate() + ', ' + now.getFullYear()); //Tuesday February 12 2013
        }
    }

 
    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 3,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              dots: false
            }
          }
        ]
      };


  return (
    <div className = "mb-10 w-3/4 glass mt-10  m-auto">
    <div className = "flex items-center justify-center mb-5">
        <h1 className = "text-black text-xl text-center header mt-5 mr-2">Future Forecasts</h1>
        <ImClock className = "mt-5" fontSize={25}/>
    </div>
    <div className = "flex items-center justify-center">
        <Slider {...settings} className = 'w-4/5 mb-10'>
          {data.list.map((item, index) => (
                    <div key = {index}>
                            <p className = "text-center mt-3 mb-2 font-bold ">{formatDate((item.dt_txt).substring(0,10))}</p>
                            <p className = "text-center mb-1 text-xl">{formatTime((item.dt_txt).substring(10))}</p>
                            <img alt = "weather-icon" className = "weather-img-small m-auto mb-1" src = {`Images/${item.weather[0].icon}.png`}/>
                            <p className = "text-center text-2xl mb-5">{convertFunc((item.main.temp))}</p>
                    </div> 
                ))}
        </Slider>

    </div>
    </div>
)}


export default Forecast