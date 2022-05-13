import ShowCountry from "./ShowCountry";

const CountryList = ({countriesToShow}) => {
    return (
        <div>
            <h2>Countries</h2>
            {countriesToShow.map(country => 
                <div key={country.name.common}>
                    <div>{country.name.common}</div>
                    <ShowCountry 
                        countryToShow={country} 
                    />
                </div>
            )}
        </div>
    );
};

export default CountryList;