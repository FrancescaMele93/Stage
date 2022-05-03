const Contact = ({personsToShow}) => {
    return (
        <div>
            {personsToShow.map(person => 
                <p key={person.id}>{person.name} - {person.number}</p>  
            )}
        </div>
    );
};

export default Contact;