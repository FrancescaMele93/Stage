const SearchCountry = props => {
    return (
        <div>
            <h1>{props.header}</h1>
            <div>
                {props.title} <input
                    value={props.value}
                    onChange={props.onChange}
                />
            </div>
        </div>
    );
};

export default SearchCountry;