import './App.css';
import { useEffect } from 'react'
import io from "socket.io-client";

const socket = io();

function App() {

  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected')
    })

  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
