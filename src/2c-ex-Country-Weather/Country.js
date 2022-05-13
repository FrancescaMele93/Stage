import axios from "axios";
import { useEffect, useState } from "react";
import { REACT_APP_API_KEY } from "../App";
import WeatherWidget from "./Weather-Widget";

const Country = ({country}) => {    
    return (
        <div>
            <h2>{country.name.common}</h2>
            <p>Capital: {country.capital}</p>
            <p>Area: {country.area} km<sup>2</sup></p>
            <h3>Languages: </h3>
            <ul>
                {Object.values(country.languages).map(language =>
                    <li key={language}>{language}</li>    
                )}
            </ul>
            <img className="flag" src={country.flags.svg}></img>
            <WeatherWidget country={country} />
        </div>
    );
};

export default Country;