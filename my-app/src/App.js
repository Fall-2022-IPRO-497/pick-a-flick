import logo from './logo.PNG';
import './App.css';
import Like_button from './component/Like_button'
import Dislike_button from './component/Dislike_button'
import Pass_button from './component/Pass_button'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Pick-a-Flick</h1>
        <img src={logo} alt="" ></img>
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
      <Like_button/>
      <Pass_button/>
      <Dislike_button/>
    </div>
  );
}

export default App;
