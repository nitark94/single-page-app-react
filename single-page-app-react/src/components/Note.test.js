import { render, screen, fireEvent } from '@testing-library/react';
import Note from './Note';

test('Note component renders correctly and adds a note', () => {
  render(<Note />);

  const input = screen.getByPlaceholderText('Lisää muistiinpano');
  fireEvent.change(input, { target: { value: 'Uusi muistiinpano' } });

  const button = screen.getByText('Lisää');
  fireEvent.click(button);

  const newNote = screen.getByText('Uusi muistiinpano');
  expect(newNote).toBeInTheDocument();
});

test('Displays error message when input is empty and Add button is clicked', () => {
    render(<Note />);
    
    const button = screen.getByText('Lisää');
    fireEvent.click(button);
    
    const errorMessage = screen.getByText('Syötä muistiinpano');
    expect(errorMessage).toBeInTheDocument();
  });  

test('Adding a new note adds it to the list', () => {
    render(<Note />);
    const input = screen.getByPlaceholderText('Lisää muistiinpano');
    const button = screen.getByText('Lisää');
  
    fireEvent.change(input, { target: { value: 'Uusi muistiinpano' } });
    fireEvent.click(button);
  
    const newNote = screen.getByText('Uusi muistiinpano');
    expect(newNote).toBeInTheDocument();
  });
  
  test('Removing a note removes it from the list', () => {
    render(<Note />);
    
    // Lisää muistiinpano
    const input = screen.getByPlaceholderText('Lisää muistiinpano');
    fireEvent.change(input, { target: { value: 'Poistettava muistiinpano' } });
    const button = screen.getByText('Lisää');
    fireEvent.click(button);
  
    const removeButton = screen.getByText('Poista');
    fireEvent.click(removeButton);
  
    const removedNote = screen.queryByText('Poistettava muistiinpano');
    expect(removedNote).toBeNull();
  });
  

  test('Form does not submit with empty input', () => {
    render(<Note />);
    const button = screen.getByText('Lisää');
    fireEvent.click(button);
    const errorMessage = screen.getByText('Syötä muistiinpano');
    expect(errorMessage).toBeInTheDocument();
  });

  test('Fetches notes from the API', async () => {
    const mockNotes = [{ id: 1, text: 'Test note' }];
    global.fetch = vi.fn().mockResolvedValueOnce({
      json: () => mockNotes,
    });
  
    render(<Note />);
    const noteText = await screen.findByText('Test note');
    expect(noteText).toBeInTheDocument();
  });
  

  test('Displays error message when API call fails', async () => {
    global.fetch = jest.fn().mockRejectedValueOnce(new Error('API error'));
    render(<Note />);
    const errorMessage = await screen.findByText('Virhe yhteydessä');
    expect(errorMessage).toBeInTheDocument();
  });

  test('Handles long input for notes', () => {
    render(<Note />);
    const longText = 'A'.repeat(1000);
    const input = screen.getByPlaceholderText('Lisää muistiinpano');
    fireEvent.change(input, { target: { value: longText } });
    const button = screen.getByText('Lisää');
    fireEvent.click(button);
    const newNote = screen.getByText(longText);
    expect(newNote).toBeInTheDocument();
  });
  
  test('Notes are displayed in chronological order', () => {
    const notes = [
      { id: 1, text: 'First note' },
      { id: 2, text: 'Second note' },
    ];
    render(<Note notes={notes} />);
    const firstNote = screen.getByText('First note');
    const secondNote = screen.getByText('Second note');
    expect(firstNote).toBeInTheDocument();
    expect(secondNote).toBeInTheDocument();
    expect(firstNote.compareDocumentPosition(secondNote)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
  });

  test('Toggles between light and dark theme', () => {
    render(<Note />);
    const themeButton = screen.getByText('Vaihda teema');
    fireEvent.click(themeButton);
    const body = document.body;
    expect(body.classList.contains('dark')).toBe(true);
  });
  