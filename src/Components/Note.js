export const Note = ({note, toggleImportance}) => {
    const label = note.important
        ? 'Make not important' : 'Make important';
    // console.log(note.important)
    
    return (
        <div>
            <li key={note.id}>{note.content}</li>
            <button onClick={toggleImportance}>{label}</button>
        </div>
    );
};