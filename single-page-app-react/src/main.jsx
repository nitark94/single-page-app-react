import ReactDOM from 'react-dom/client'
import App from './App'

const notes = [
  { id: 1, content: "HTML is easy" },
  { id: 2, content: "Browser can execute only JavaScript" },
  { id: 3, content: "GET and POST are the most important methods of HTTP protocol" }
];

const result = notes.map(note => note.content)
console.log(result)

ReactDOM.createRoot(document.getElementById('root')).render(
  <App notes={notes} />
);
