import axios from "axios";
import { useEffect, useState } from "react";
import Contacts from "./Components/Contacts";
import NewContactForm from "./Components/NewContactForm";
import Search from "./Components/Search";


const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchedValue, setSearchedValue] = useState('');

  const hook = () => {
    console.log('enter hook');
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log(response, 'response in then');
        setPersons(response.data);
      })
    }
    
  useEffect(hook, []);
  console.log('persons.length = ', persons.length);

  const personsToShow = persons.filter(person => 
    person.name.toLocaleLowerCase().includes(searchedValue.toLocaleLowerCase()) 
    || person.number.includes(searchedValue)
  )

  const addContact = e => {
    e.preventDefault();

    const newContact = {
      id: persons.length + 1,
      name: newName,
      number: newNumber
    };

    const existingContact = persons.filter(person => person.number === newNumber);

    if (existingContact.length > 0) {
      alert(`${newName} already exists (you dolt)`);
      return;
    }

    setPersons(persons.concat(newContact));
  };

  const handleNameChange = e => {
    setNewName(e.target.value);
  };

  const handleNumChange = e => {
    setNewNumber(e.target.value);
  };

  const handleSearch = e => {
    setSearchedValue(e.target.value);
    // setSearchedValue(searchedValue.toLocaleLowerCase())
    // function witnessMySadAttempts() {}
    // console.log(searchedValue, 'searchedValue');

    // if (searchedValue === '') {
    //   console.log('inside if');
    //   setSearchedContacts([]);
    //   return;
    // }

    // setSearchedContacts(persons);
    // console.log(searchedContacts, 'searchedContacts')
    // setSearched(searchedContacts.filter(contact => contact.name.includes(searchedValue)));
    // console.log(searched);
    // console.log(searched, 'filter');
    
    // setSearchedContacts(searched);
    
    // console.log(searchedContacts, 'searchedContacts')
    // console.log(searched, 'searched')
    // }
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Search 
        header={'Search contacts'}
        title={'Search'}
        inputValue={searchedValue}
        handleSearch={handleSearch}
      />
      {/* <div>
        {searched.map(contact => 
          <p key={contact.name}>{contact.name} - {contact.number}</p>
        )}
      </div> */}
      <NewContactForm 
        header={'Add a contact'}
        newName={newName}
        newNumber={newNumber}
        addContact={addContact} 
        handleNameChange={handleNameChange}
        handleNumChange={handleNumChange}
      />
      <Contacts personsToShow={personsToShow} />
    </div>
  );
};

export default App;