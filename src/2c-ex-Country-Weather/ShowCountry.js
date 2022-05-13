import { useState } from "react";
import Country from "./Country";

const ShowCountry = ({countryToShow}) => {
    const [clicked, setClicked] = useState(false);

    return (
        clicked === true
        ? (
            <>
                <button onClick={() => setClicked(!clicked)}>Hide</button>
                <div>
                    <Country country={countryToShow} />
                </div>
            </>
        )
        : <button onClick={() => setClicked(!clicked)}>Show</button>
    )
};

export default ShowCountry;