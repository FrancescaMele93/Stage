import axios from "axios";
import { useEffect, useState } from "react";
import { Note } from "./Components/Note";
import noteService from "./services/notes";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAllNotes, setShowAllNotes] = useState(true);
  
  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes);
      });
  }, []);

  const addNote = event => {
    event.preventDefault();

    const newNoteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
    };

    // Old axios call:
    // axios
    //   .post(`http://localhost:3001/notes`, newNoteObject)
    //   .then(response => {
    //     // Update the notes to add the new one
    //     setNotes(notes.concat(response.data));
    //     // Give empty value to input field:
    //     setNewNote('');
    //     // ...so that it will only show the placeholder:
    //     setPlaceholeder('Add another note');
    //   });

    noteService
      .create(newNoteObject)
      .then(returnedNote => {
      // Update the notes to add the new one
        setNotes(notes.concat(returnedNote));
      // Give empty value to input field:
        setNewNote('');
      });
  };

  const handleChange = event => {
    setNewNote(event.target.value);
  };

  // Change notes status depending on importance
  const notesToShow = showAllNotes
    ? notes
    : notes.filter(note => note.important);

  const placeholder = 'Add another note';

  const toggleNoteImportance = id => {
    // const url = `http://localhost:3001/notes/${id}`;
    const noteToChange = notes.find(note => note.id === id);
    const changedNote = {
      ...noteToChange,
      important: !noteToChange.important
    };

    // Old method:
    // axios
    //   .put(url, changedNote)
    //   .then(response => {
    //     setNotes(notes.map(note => note.id !== id ? note : response.data))
    //   });

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      });
  };

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} note={note} toggleImportance={() => toggleNoteImportance(note.id)} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input 
          value={newNote}
          placeholder={placeholder}
          onChange={handleChange} 
        />
        <button type="submit">Save</button>
      </form>
      <br></br>
      <div>
        <button onClick={() => setShowAllNotes(!showAllNotes)}>
          Show {showAllNotes ? "important notes" : "all notes"}
        </button>
      </div>
    </div>
  )
};

export default App;