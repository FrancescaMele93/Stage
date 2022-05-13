const Search = props => {
    return (
        <div>
            <h2>{props.header}</h2>
            <div>
            {props.title}: <input 
                value={props.inputValue}
                onChange={props.handleSearch}
            />
            </div>
        </div>
    );
};

export default Search;