import axios from "axios";
import { useEffect, useState } from "react";
import { REACT_APP_API_KEY } from "../App";

const WeatherWidget = ({country}) => {
    const [weatherState, setWeatherState] = useState({
        main: {
            temp: ''
        },
        weather: [
            ''
        ],
        wind: {
            speed: ''
        }
    });

    const lat = country.capitalInfo.latlng[0];
    const long = country.capitalInfo.latlng[1];

    const hook = () => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${REACT_APP_API_KEY}`)
            .then(response => {
                console.log(response.data);
                setWeatherState(response.data);
            });
    };

    const celsiusTemp = weatherState.main.temp - 273.15;
    const weatherIcn = weatherState.weather[0].icon;
    
    useEffect(hook, []);

    return (
        <div>
            <h3>Weather in {country.capital}</h3>
            <p>Temperature: {celsiusTemp.toFixed(2)} °C</p>
            <img src={`http://openweathermap.org/img/wn/${weatherIcn}@2x.png`}></img>
            <p>Wind: {weatherState.wind.speed} m/s</p>
        </div>
    );
};

export default WeatherWidget;