import axios from "axios";
import { useEffect, useState } from "react";
import Countries from "./Components/Countries";
import SearchCountry from "./Components/Search-country";
import "./App.css";

export const {REACT_APP_API_KEY} = process.env;

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchedValue, setSearchedValue] = useState('');
  // const [shownCountries, setShownCountries] = useState([]);

  const hook = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data);
      });
  };

  useEffect(hook, []);

  const filteredCountries = countries.filter(country =>
    country.name.common.toLocaleLowerCase().includes(searchedValue.toLocaleLowerCase())
  );

  // const filteredCountries = searchedValue === ''
  // ? 'Please search for a country'
  // : countries.filter(country =>
  //     country.name.common.toLocaleLowerCase().includes(searchedValue.toLocaleLowerCase())
  //   );

  const handleSearch = e => {
    setSearchedValue(e.target.value);
    // Show only ten countries if there's more than ten matches
    // if (filteredCountries.length > 10) {
    //   const slicedArr = filteredCountries.slice(0, 10);
    //   setShownCountries(slicedArr);
  
    //   return;
    // }
  
    // setShownCountries(filteredCountries);
  };

  return (
    <div>
      <SearchCountry
        header={'Search countries'}
        title={'Search for a country: '}
        value={searchedValue}
        onChange={handleSearch}
      />
      <Countries 
        countriesToShow={filteredCountries}
        searchedValue={searchedValue}
      />
    </div>
  )  
};

export default App;