import Contact from "./Contact";

const Contacts = ({personsToShow}) => {
    return (
        <div>
            <h2>Contacts</h2>
            <Contact personsToShow={personsToShow} />
        </div>
    );
};

export default Contacts;