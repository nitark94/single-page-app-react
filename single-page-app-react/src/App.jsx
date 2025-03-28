import { useState } from 'react';
import Note from './components/Note';

const App = (props) => {
  const [notes, setNotes] = useState(props.notes);
  const [newNote, setNewNote] = useState('');

  const addNote = (event) => {
    event.preventDefault();
    if (newNote.trim()) {
      const noteObject = {
        id: notes.length + 1,
        content: newNote,
      };
      setNotes(notes.concat(noteObject));
      setNewNote('');
    }
  };

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note => (
          <Note key={note.id} note={note} />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input 
          type="text" 
          value={newNote} 
          onChange={handleNoteChange} 
          placeholder="Add a new note"
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default App;
