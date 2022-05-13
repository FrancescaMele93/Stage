const NewContactForm = props => {
    return (
        <form>
            <h2>{props.header}</h2>
            <div>
                Name: <input 
                    value={props.newName} 
                    onChange={props.handleNameChange}
                />
            </div>
            <div>
                Number: <input 
                    value={props.newNumber} 
                    onChange={props.handleNumChange}
                />
            </div>
            <div>
                <button type="submit" onClick={props.addContact}>Add</button>
            </div>
        </form>
    );
};

export default NewContactForm;