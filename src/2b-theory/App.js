import { useState } from "react";
import { Note } from "./Components/Note";

const App = (props) => {
  const [notes, setNotes] = useState(props.notes);
  const [newNote, setNewNote] = useState('');
  const [placeholder, setPlaceholeder] = useState(
    'Add another note'
  );
  const [showAllNotes, setShowAllNotes] = useState(true);

  const addNote = event => {
    event.preventDefault();

    const newNoteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: notes.length + 1
    };

    setNotes(notes.concat(newNoteObject));
    // Give empty value to input field:
    setNewNote('');
    // ...so that it will only show the placeholder:
    setPlaceholeder('Add another note');
  };

  const handleChange = event => {
    console.log(event.target.value, 'onchange value');
    setNewNote(event.target.value);
  };

  // Change notes status depending on importance
  const notesToShow = showAllNotes
    ? notes
    : notes.filter(note => note.important);

    // My own shittyattempt to solve the button thing
    // (the good one is below, under this button)
  const handleShowAll = e => {
    // Change notes status
    setShowAllNotes(!showAllNotes);
    
    // Change button text:
    e.target.innerHTML = e.target.innerHTML === 'Show all notes'
      ? e.target.innerHTML = 'Show important notes'
      : e.target.innerHTML = 'Show all notes'
  };

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} note={note} />
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
        <button onClick={handleShowAll} title="buh">Show all notes</button>
      </div>
      <br></br>
      <div>
        <button onClick={() => setShowAllNotes(!showAllNotes)}>
          Show {showAllNotes ? 'important' : 'all'} notes
        </button>
      </div>
    </div>
  )
};

export default App;