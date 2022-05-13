import Country from "./Country";
import CountryList from "./Country-List";

const Countries = ({countriesToShow, handleShowBtn, searchedValue, showBtn}) => {
    if (searchedValue === '') {
        return <p>Please search for a country.</p>;  
    }

    // switch(countriesToShow.length) {
    //     case 2 :
    //     case 3 :
    //     case 4 :
    //     case 5 :
    //     case 6 :
    //     case 7 :
    //     case 8 :
    //     case 9 :
    //     case 10 :
    //         return (
    //             <CountryList 
    //                 countriesToShow={countriesToShow}
    //             />
    //         );
    //     case 1 :
    //         return (
    //             <Country country={countriesToShow[0]} />
    //         );
    //     case 0 :
    //         return <p>There is no match for this query.</p>
    //     default:
    //         return (
    //             <p>Too many results. Please refine your search.</p>
    //         );  
    // }

    if (searchedValue === '') {
        return <p>Please search for a country.</p>;  
    } else if (countriesToShow.length <= 10 && countriesToShow.length > 1) {
        return (
            <CountryList 
                countriesToShow={countriesToShow}
                handleShowBtn={handleShowBtn}
                showBtn={showBtn}
            />
        );
    } else if (countriesToShow.length === 1) {
        return (
            <Country country={countriesToShow[0]} />
        );
    } else if (countriesToShow.length === 0) {
        return <p>There is no match for this query.</p>;
    } else {
        return <p>Too many results. Please refine your search.</p>;
    }

};

export default Countries;