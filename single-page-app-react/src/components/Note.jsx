import React, { useState, useEffect } from 'react';

const Note = () => {
  const [notes, setNotes] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
  }, []);

  const addNote = () => {
    if (inputValue.trim() === '') {
      setError('Syötä muistiinpano');
      return;
    }
    const newNote = { id: Date.now(), content: inputValue };
    setNotes([...notes, newNote]);
    setInputValue('');
    setError('');
  };

  const removeNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Lisää muistiinpano"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={addNote}>Lisää</button>
      {error && <div>{error}</div>}
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            {note.content}
            <button onClick={() => removeNote(note.id)}>Poista</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Note;
